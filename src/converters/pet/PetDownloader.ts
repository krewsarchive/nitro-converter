import { singleton } from 'tsyringe';
import { Configuration } from '../../common/config/Configuration';
import { HabboAssetSWF } from '../../swf/HabboAssetSWF';
import { FileUtilities } from '../../utils/FileUtilities';
import Logger from '../../utils/Logger';

@singleton()
export class PetDownloader
{
    constructor(
        private readonly _config: Configuration,
        private readonly _logger: Logger)
    {}

    public async download(callback: (habboAssetSwf: HabboAssetSWF, className: string) => Promise<void>): Promise<void>
    {
        try
        {
            const petTypes = await this.parsePetTypes();
            const classNames: string[] = [];

            for(const petType of petTypes)
            {
                if(classNames.indexOf(petType) >= 0) continue;

                classNames.push(petType);

                try
                {
                    await this.extractPet(petType, callback);
                }

                catch (error)
                {
                    console.log();
                    console.error(error);
                }
            }
        }

        catch (error)
        {
            console.log();
            console.error(error);
        }
    }

    public async parsePetTypes(): Promise<string[]>
    {
        try
        {
            await this._config.loadExternalVariables();

            const petTypes: string[] = [];

            const pets = this._config.getValue('pet.configuration');

            if(pets)
            {
                const types = pets.split(',');

                for(const type of types) petTypes.push(type);
            }

            return petTypes;
        }

        catch (error)
        {
            console.log();
            console.error(error);
        }
    }

    public async extractPet(className: string, callback: (habboAssetSwf: HabboAssetSWF, className: string) => Promise<void>): Promise<void>
    {
        let url = this._config.getValue('dynamic.download.url.pet');

        if(!url || !url.length) return;

        url = url.replace('%className%', className);

        try
        {
            const buffer = await FileUtilities.readFileAsBuffer(url);
            const newHabboAssetSWF = new HabboAssetSWF(buffer);

            await newHabboAssetSWF.setupAsync();
            await callback(newHabboAssetSWF, className);
        }

        catch (error)
        {
            console.log();
            console.error(error);
        }
    }
}