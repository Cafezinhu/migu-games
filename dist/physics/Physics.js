import RAPIER from '@dimforge/rapier2d-compat';
export let PhysicsPlugin = RAPIER;
export class Physics {
    static createBoxCollider(width, height) {
        return {
            collider: PhysicsPlugin.ColliderDesc.cuboid(width / 2, height / 2),
            shape: 'box',
            width,
            height
        };
    }
    static createCircleCollider(radius) {
        return {
            collider: PhysicsPlugin.ColliderDesc.ball(radius),
            shape: 'circle',
            radius
        };
    }
    static createCapsuleCollider(height, radius) {
        return {
            collider: PhysicsPlugin.ColliderDesc.capsule(height / 2, radius),
            shape: 'capsule',
            height,
            radius
        };
    }
}
