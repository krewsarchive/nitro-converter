import { HabboAvatarActionsActionParamXML } from '../xml/habboavataractions/HabboAvatarActionsActionParamXML';
import { IHabboAvatarActions } from './../json/habboavataractions/IHabboAvatarActions';
import { IHabboAvatarActionsAction } from './../json/habboavataractions/IHabboAvatarActionsAction';
import { IHabboAvatarActionsActionParam } from './../json/habboavataractions/IHabboAvatarActionsActionParam';
import { IHabboAvatarActionsActionType } from './../json/habboavataractions/IHabboAvatarActionsActionType';
import { HabboAvatarActionsActionTypeXML } from './../xml/habboavataractions/HabboAvatarActionsActionTypeXML';
import { HabboAvatarActionsActionXML } from './../xml/habboavataractions/HabboAvatarActionsActionXML';
import { HabboAvatarActionsXML } from './../xml/habboavataractions/HabboAvatarActionsXML';
import { Mapper } from './asset';

export class HabboAvatarActionsMapper extends Mapper
{
    public static mapXML(xml: any, output: IHabboAvatarActions): void
    {
        if(!xml || !output) return;

        if(xml.actions !== undefined) HabboAvatarActionsMapper.mapHabboAvatarActionsMainXML(new HabboAvatarActionsXML(xml.actions), output);
    }

    private static mapHabboAvatarActionsMainXML(xml: HabboAvatarActionsXML, output: IHabboAvatarActions): void
    {
        if(!xml || !output) return;

        if(xml.actions !== undefined)
        {
            if(xml.actions.length)
            {
                output.actions = [];

                HabboAvatarActionsMapper.mapHabboAvatarActionsXML(xml.actions, output.actions);
            }
        }
    }

    private static mapHabboAvatarActionsXML(xml: HabboAvatarActionsActionXML[], output: IHabboAvatarActionsAction[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const actionXML of xml)
        {
            const action: IHabboAvatarActionsAction = {};

            if(actionXML.id !== undefined) action.id = actionXML.id;
            if(actionXML.state !== undefined) action.state = actionXML.state;
            if(actionXML.precedence !== undefined) action.precedence = actionXML.precedence;
            if(actionXML.main !== undefined) action.main = actionXML.main;
            if(actionXML.isDefault !== undefined) action.isDefault = actionXML.isDefault;
            if(actionXML.animation !== undefined) action.animation = actionXML.animation;
            if(actionXML.startFromFrameZero !== undefined) action.startFromFrameZero = actionXML.startFromFrameZero;
            if(actionXML.preventHeadTurn !== undefined) action.preventHeadTurn = actionXML.preventHeadTurn;
            if(actionXML.geometryType !== undefined) action.geometryType = actionXML.geometryType;
            if(actionXML.activePartSet !== undefined) action.activePartSet = actionXML.activePartSet;
            if(actionXML.assetPartDefinition !== undefined) action.assetPartDefinition = actionXML.assetPartDefinition;
            if(actionXML.lay !== undefined) action.lay = actionXML.lay;
            if(actionXML.prevents !== undefined) action.prevents = actionXML.prevents;

            if(actionXML.types !== undefined)
            {
                action.types = [];

                HabboAvatarActionsMapper.mapHabboAvatarActionTypesXML(actionXML.types, action.types);
            }

            if(actionXML.params !== undefined)
            {
                action.params = [];

                HabboAvatarActionsMapper.mapHabboAvatarActionParamsXML(actionXML.params, action.params);
            }

            output.push(action);
        }
    }

    private static mapHabboAvatarActionTypesXML(xml: HabboAvatarActionsActionTypeXML[], output: IHabboAvatarActionsActionType[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const typeXML of xml)
        {
            const type: IHabboAvatarActionsActionType = {};

            if(typeXML.id !== undefined) type.id = typeXML.id;
            if(typeXML.animated !== undefined) type.animated = typeXML.animated;
            if(typeXML.preventHeadTurn !== undefined) type.preventHeadTurn = typeXML.preventHeadTurn;
            if(typeXML.prevents !== undefined) type.prevents = typeXML.prevents;

            output.push(type);
        }
    }

    private static mapHabboAvatarActionParamsXML(xml: HabboAvatarActionsActionParamXML[], output: IHabboAvatarActionsActionParam[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const paramXML of xml)
        {
            const param: IHabboAvatarActionsActionParam = {};

            if(paramXML.id !== undefined) param.id = paramXML.id;
            if(paramXML.value !== undefined) param.value = paramXML.value;

            output.push(param);
        }
    }
}
