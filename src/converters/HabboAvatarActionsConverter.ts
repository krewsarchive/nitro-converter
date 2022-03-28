import { writeFile } from 'fs/promises';
import ora from 'ora';
import { singleton } from 'tsyringe';
import { parseStringPromise } from 'xml2js';
import { Configuration, FileUtilities, IConverter, IHabboAvatarActions } from '../common';
import { HabboAvatarActionsMapper } from './../common/mapping/mappers/HabboAvatarActionsMapper';

@singleton()
export class HabboAvatarActionsConverter implements IConverter
{
    private _habboAvatarActions: IHabboAvatarActions = null;

    constructor(
        private readonly _configuration: Configuration)
    {}

    public async convertAsync(): Promise<void>
    {
        const now = Date.now();
        const spinner = ora('Preparing HabboAvatarActions').start();
        const url = this._configuration.getValue<string>('habboavataractions.load.url');
        const content = await FileUtilities.readFileAsString(url);

        this._habboAvatarActions = ((!content.startsWith('{')) ? await this.mapXML2JSON(await parseStringPromise(content.replace(/&/g,'&amp;'))) : JSON.parse(content));

        const outputPath = (this._configuration.getValue<string>('output.path') || './assets/');
        const directory = await FileUtilities.getDirectory(`${ outputPath }gamedata`);
        const path = directory.path + '/HabboAvatarActions.json';

        await writeFile(path, JSON.stringify(this._habboAvatarActions), 'utf8');

        spinner.succeed(`HabboAvatarActions: Finished in ${ Date.now() - now }ms`);
    }

    private async mapXML2JSON(xml: any): Promise<IHabboAvatarActions>
    {
        if(!xml) return null;

        const output: IHabboAvatarActions = {};

        output.actionOffsets = [
            {
                action: 'lay',
                offsets: [
                    {
                        size: 'h',
                        direction: 4,
                        x: -17,
                        y: 17,
                        z: -0.9
                    },
                    {
                        size: 'h',
                        direction: 2,
                        x: 22,
                        y: 17,
                        z: -0.9
                    },
                    {
                        size: 'sh',
                        direction: 4,
                        x: -5,
                        y: 16,
                        z: -0.9
                    },
                    {
                        size: 'sh',
                        direction: 2,
                        x: 9,
                        y: 16,
                        z: -0.9
                    }
                ]
            }
        ];

        HabboAvatarActionsMapper.mapXML(xml, output);

        return output;
    }
}
