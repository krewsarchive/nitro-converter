
export class HabboAvatarActionsActionParamXML
{
    private _id: string;
    private _value: string;

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes)
        {
            if(attributes.id !== undefined) this._id = attributes.id;
            if(attributes.value !== undefined) this._value = attributes.value;
        }
    }

    public get id(): string
    {
        return this._id;
    }

    public get value(): string
    {
        return this._value;
    }
}
