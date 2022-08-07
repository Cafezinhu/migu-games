import {ColliderDesc} from '@dimforge/rapier2d-compat';

import RAPIER from '@dimforge/rapier2d-compat';

export let PhysicsPlugin = RAPIER;

export type ColliderData = {
    collider: ColliderDesc;
    shape: 'box' | 'circle' | 'capsule';
    width?: number;
    height?: number;
    radius?: number;
}

export class Physics{
    static createBoxCollider(width: number, height: number): ColliderData{
        return {
            collider: PhysicsPlugin.ColliderDesc.cuboid(width/2, height/2),
            shape: 'box',
            width,
            height
        }
    }

    static createCircleCollider(radius: number): ColliderData{
        return {
            collider: PhysicsPlugin.ColliderDesc.ball(radius),
            shape: 'circle',
            radius
        }
    }

    static createCapsuleCollider(height: number, radius: number): ColliderData{
        return {
            collider: PhysicsPlugin.ColliderDesc.capsule(height/2, radius),
            shape: 'capsule',
            height,
            radius
        }
    }
}