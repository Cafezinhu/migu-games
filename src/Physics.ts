import {ColliderDesc} from '@dimforge/rapier2d-compat';

import RAPIER from '@dimforge/rapier2d-compat';

export let Physics = RAPIER;

export type ColliderData = {
    collider: ColliderDesc;
    shape: 'box' | 'circle' | 'capsule';
    width?: number;
    height?: number;
    radius?: number;
}

export function createBoxCollider(width: number, height: number): ColliderData{
    return {
        collider: Physics.ColliderDesc.cuboid(width/2, height/2),
        shape: 'box',
        width,
        height
    }
}

export function createCircleCollider(radius: number): ColliderData{
    return {
        collider: Physics.ColliderDesc.ball(radius),
        shape: 'circle',
        radius
    }
}

export function createCapsuleCollider(height: number, radius: number): ColliderData{
    return {
        collider: Physics.ColliderDesc.capsule(height/2, radius),
        shape: 'capsule',
        height,
        radius
    }
}