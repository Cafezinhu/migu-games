import { ColliderDesc } from '@dimforge/rapier2d-compat';
import RAPIER from '@dimforge/rapier2d-compat';
export declare let Physics: typeof RAPIER;
export declare type ColliderData = {
    collider: ColliderDesc;
    shape: 'box' | 'circle' | 'capsule';
    width?: number;
    height?: number;
    radius?: number;
};
export declare function createBoxCollider(width: number, height: number): ColliderData;
export declare function createCircleCollider(radius: number): ColliderData;
export declare function createCapsuleCollider(height: number, radius: number): ColliderData;
