import { HabboAvatarActionsActionXML } from './HabboAvatarActionsActionXML';

export class HabboAvatarActionsXML
{
    private _actions: HabboAvatarActionsActionXML[];

    constructor(xml: any)
    {
        if(xml.action !== undefined)
        {
            if(Array.isArray(xml.action))
            {
                this._actions = [];

                for(const library of xml.action) this._actions.push(new HabboAvatarActionsActionXML(library));
            }
        }
    }

    public get actions(): HabboAvatarActionsActionXML[]
    {
        return this._actions;
    }
}
