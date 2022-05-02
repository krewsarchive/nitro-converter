import { HabboAvatarActionsActionParamXML } from './HabboAvatarActionsActionParamXML';
import { HabboAvatarActionsActionTypeXML } from './HabboAvatarActionsActionTypeXML';

export class HabboAvatarActionsActionXML
{
    private _id: string;
    private _state: string;
    private _precedence: number;
    private _main: boolean;
    private _isDefault: boolean;
    private _animation: boolean;
    private _startFromFrameZero: boolean;
    private _preventHeadTurn: boolean;
    private _geometryType: string;
    private _activePartSet: string;
    private _assetPartDefinition: string;
    private _lay: string;
    private _prevents: string[];
    private _types: HabboAvatarActionsActionTypeXML[];
    private _params: HabboAvatarActionsActionParamXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes)
        {
            if(attributes.id !== undefined) this._id = attributes.id;
            if(attributes.state !== undefined) this._state = (attributes.state as string).toLowerCase();
            if(attributes.precedence !== undefined) this._precedence = parseInt(attributes.precedence);
            if(attributes.main !== undefined) this._main = attributes.main === '1';
            if(attributes.isdefault !== undefined) this._isDefault = attributes.isdefault === '1';
            if(attributes.animation !== undefined) this._animation = attributes.animation === '1';
            if(attributes.startfromframezero !== undefined) this._startFromFrameZero = attributes.startfromframezero === 'true';
            if(attributes.preventheadturn !== undefined) this._preventHeadTurn = attributes.preventheadturn === 'true';
            if(attributes.geometrytype !== undefined) this._geometryType = attributes.geometrytype;
            if(attributes.activepartset !== undefined) this._activePartSet = attributes.activepartset;
            if(attributes.assetpartdefinition !== undefined) this._assetPartDefinition = attributes.assetpartdefinition;
            if(attributes.lay !== undefined) this._lay = attributes.lay;
            if(attributes.prevents !== undefined) this._prevents = attributes.prevents.split(',');

            if(xml.type !== undefined)
            {
                this._types = [];

                if(Array.isArray(xml.type))
                {
                    for(const library of xml.type) this._types.push(new HabboAvatarActionsActionTypeXML(library));
                }
            }

            if(xml.param !== undefined)
            {
                this._params = [];

                if(Array.isArray(xml.param))
                {
                    for(const library of xml.param) this._params.push(new HabboAvatarActionsActionParamXML(library));
                }
            }
        }
    }

    public get id(): string
    {
        return this._id;
    }

    public get state(): string
    {
        return this._state;
    }

    public get precedence(): number
    {
        return this._precedence;
    }

    public get main(): boolean
    {
        return this._main;
    }

    public get isDefault(): boolean
    {
        return this._isDefault;
    }

    public get startFromFrameZero(): boolean
    {
        return this._startFromFrameZero;
    }

    public get animation(): boolean
    {
        return this._animation;
    }

    public get preventHeadTurn(): boolean
    {
        return this._preventHeadTurn;
    }

    public get geometryType(): string
    {
        return this._geometryType;
    }

    public get activePartSet(): string
    {
        return this._activePartSet;
    }

    public get assetPartDefinition(): string
    {
        return this._assetPartDefinition;
    }

    public get lay(): string
    {
        return this._lay;
    }

    public get prevents(): string[]
    {
        return this._prevents;
    }

    public get types(): HabboAvatarActionsActionTypeXML[]
    {
        return this._types;
    }

    public get params(): HabboAvatarActionsActionParamXML[]
    {
        return this._params;
    }
}
