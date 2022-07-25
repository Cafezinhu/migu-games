declare type PhysicsType = typeof import('@dimforge/rapier2d');
import { ColliderDesc } from '@dimforge/rapier2d';
export declare let Physics: PhysicsType;
export declare type ColliderData = {
    collider: ColliderDesc;
    shape: 'box' | 'circle' | 'capsule';
    width?: number;
    height?: number;
    radius?: number;
};
export declare function setPhysics(p: PhysicsType): void;
export declare function createBoxCollider(width: number, height: number): ColliderData;
export declare function createCircleCollider(radius: number): ColliderData;
export declare function createCapsuleCollider(height: number, radius: number): ColliderData;
export {};
