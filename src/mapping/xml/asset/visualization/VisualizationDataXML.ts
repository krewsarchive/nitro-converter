import { AnimationXML } from './animation/AnimationXML';
import { ColorXML } from './color/ColorXML';
import { GestureXML } from './GestureXML';
import { LayerXML } from './LayerXML';
import { PostureXML } from './PostureXML';
import { VisualDirectionXML } from './VisualDirectionXML';

export class VisualizationDataXML
{
    private readonly _size: number;
    private readonly _layerCount: number;
    private readonly _angle: number;

    private readonly _layers: LayerXML[]
    private readonly _directions: VisualDirectionXML[];
    private readonly _colors: ColorXML[];
    private readonly _animations: AnimationXML[];
    private readonly _postures: PostureXML[];
    private readonly _gestures: GestureXML[];

    constructor(xml: any)
    {
        const attributes = xml.$;

        if(attributes !== undefined)
        {
            if(attributes.size !== undefined) this._size = parseInt(attributes.size);
            if(attributes.layerCount !== undefined) this._layerCount = parseInt(attributes.layerCount);
            if(attributes.angle !== undefined) this._angle = parseInt(attributes.angle);
        }

        if(xml.layers !== undefined)
        {
            this._layers = [];

            for(const layerParent of xml.layers)
            {
                if(Array.isArray(layerParent.layer))
                {
                    for(const layer of layerParent.layer) this._layers.push(new LayerXML(layer));
                }
            }
        }

        if(xml.directions !== undefined)
        {
            this._directions = [];

            for(const directionParent of xml.directions)
            {
                if(Array.isArray(directionParent.direction))
                {
                    for(const direction of directionParent.direction) this._directions.push(new VisualDirectionXML(direction));
                }
            }
        }

        if(xml.colors !== undefined)
        {
            this._colors = [];

            for(const colorParent of xml.colors)
            {
                if(Array.isArray(colorParent.color))
                {
                    for(const color of colorParent.color) this._colors.push(new ColorXML(color));
                }
            }
        }

        if(xml.animations !== undefined)
        {
            this._animations = [];

            for(const animationParent of xml.animations)
            {
                if(Array.isArray(animationParent.animation))
                {
                    for(const animation of animationParent.animation) this._animations.push(new AnimationXML(animation));
                }
            }
        }

        if((xml.postures !== undefined) && xml.postures.length)
        {
            this._postures = [];

            for(const postureParent of xml.postures)
            {
                if(Array.isArray(postureParent.posture))
                {
                    for(const posture of postureParent.posture) this._postures.push(new PostureXML(posture));
                }
            }
        }

        if(xml.gestures !== undefined)
        {
            this._gestures = [];

            for(const gestureParent of xml.gestures)
            {
                if(Array.isArray(gestureParent.gesture))
                {
                    for(const gesture of gestureParent.gesture) this._gestures.push(new GestureXML(gesture));
                }
            }
        }
    }

    public get size(): number
    {
        return this._size;
    }

    public get layerCount(): number
    {
        return this._layerCount;
    }

    public get angle(): number
    {
        return this._angle;
    }

    public get layers(): LayerXML[]
    {
        return this._layers;
    }

    public get directions(): VisualDirectionXML[]
    {
        return this._directions;
    }

    public get colors(): ColorXML[]
    {
        return this._colors;
    }

    public get animations(): AnimationXML[]
    {
        return this._animations;
    }

    public get postures(): PostureXML[]
    {
        return this._postures;
    }

    public get gestures(): GestureXML[]
    {
        return this._gestures;
    }
}
