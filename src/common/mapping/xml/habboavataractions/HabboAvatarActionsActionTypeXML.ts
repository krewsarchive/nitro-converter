
export class HabboAvatarActionsActionTypeXML
{
    private _id: string;
    private _animated: boolean;
    private _preventHeadTurn: boolean;
    private _prevents: string[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes)
        {
            if(attributes.id !== undefined) this._id = attributes.id;
            if(attributes.animated !== undefined) this._animated = attributes.animated === 'true';
            if(attributes.preventheadturn !== undefined) this._preventHeadTurn = attributes.preventheadturn === 'true';
            if(attributes.prevents !== undefined) this._prevents = attributes.prevents.split(',');
        }
    }

    public get id(): string
    {
        return this._id;
    }

    public get animated(): boolean
    {
        return this._animated;
    }

    public get preventHeadTurn(): boolean
    {
        return this._preventHeadTurn;
    }

    public get prevents(): string[]
    {
        return this._prevents;
    }
}
