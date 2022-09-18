import { ColliderDesc } from '@dimforge/rapier2d-compat';
import RAPIER from '@dimforge/rapier2d-compat';
export declare let PhysicsPlugin: typeof RAPIER;
export declare type ColliderData = {
    collider: ColliderDesc;
    shape: 'box' | 'circle' | 'capsule';
    width?: number;
    height?: number;
    radius?: number;
};
export declare class Physics {
    static createBoxCollider(width: number, height: number): ColliderData;
    static createCircleCollider(radius: number): ColliderData;
    static createCapsuleCollider(height: number, radius: number): ColliderData;
}
