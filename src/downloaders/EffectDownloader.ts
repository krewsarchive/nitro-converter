import Configuration from "../config/Configuration";
import HabboAssetSWF from "../swf/HabboAssetSWF";
import File from "../utils/File";

const fetch = require('node-fetch');
const xml2js = require('xml2js');
const parser = new xml2js.Parser(/* options */);

export default class EffectDownloader {
    private readonly _config: Configuration;

    constructor(config: Configuration) {
        this._config = config;
    }


    public static types: Map<string, string> = new Map<string, string>();

    public async download(callback: (habboAssetSwf: HabboAssetSWF) => Promise<void>) {
        const outputFolderEffect = this._config.getValue("output.folder.effect");
        const figureMap = await this.parseEffectMap();
        const map = figureMap.map;

        let count = 0;
        for (const lib of map.effect) {
            const info = lib['$'];
            const className: string = info.lib;

            const assetOutputFolder = new File(outputFolderEffect + "/" + className);
            if (assetOutputFolder.exists()) {
                continue;
            }

            if (!EffectDownloader.types.has(className)) {
                const url = this._config.getValue("dynamic.download.url.effect").replace("%className%", className);
                let buffer: Buffer | null = null;

                if (url.includes("http")) {
                    const fetchData = await fetch(url);
                    if (fetchData.status === 404) {
                        console.log("SWF File does not exist: " + url);
                        continue;
                    }

                    const arrayBuffer = await fetchData.arrayBuffer();
                    buffer = Buffer.from(arrayBuffer);
                } else {
                    const file = new File(url);
                    if (!file.exists()) {
                        console.log("SWF File does not exist: " + file.path);
                        return;
                    }
                }

                try {
                    const newHabboAssetSWF: HabboAssetSWF = new HabboAssetSWF(buffer !== null ? buffer : url);
                    await newHabboAssetSWF.setupAsync();

                    EffectDownloader.types.set(className, info.type);
                    await callback(newHabboAssetSWF);
                } catch (e) {
                    console.log(className);
                    console.log(e);
                }
            }
        }
    }

    async parseEffectMap() {
        const figureMapPath = this._config.getValue("effectmap.url");
        const figureFetch = await fetch(figureMapPath);
        const figureMap = await figureFetch.text();

        return await parser.parseStringPromise(figureMap);
    }
}