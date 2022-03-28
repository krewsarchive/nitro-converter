import { IHabboAvatarActionsActionParam } from './IHabboAvatarActionsActionParam';
import { IHabboAvatarActionsActionType } from './IHabboAvatarActionsActionType';

export interface IHabboAvatarActionsAction
{
    id?: string;
    state?: string;
    precedence?: number;
    main?: boolean;
    isDefault?: boolean;
    animation?: boolean;
    startFromFrameZero?: boolean;
    preventHeadTurn?: boolean;
    geometryType?: string;
    activePartSet?: string;
    assetPartDefinition?: string;
    lay?: string;
    prevents?: string[];
    types?: IHabboAvatarActionsActionType[];
    params?: IHabboAvatarActionsActionParam[];
}
