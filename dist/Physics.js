import RAPIER from '@dimforge/rapier2d-compat';
export let Physics = RAPIER;
export function createBoxCollider(width, height) {
    return {
        collider: Physics.ColliderDesc.cuboid(width / 2, height / 2),
        shape: 'box',
        width,
        height
    };
}
export function createCircleCollider(radius) {
    return {
        collider: Physics.ColliderDesc.ball(radius),
        shape: 'circle',
        radius
    };
}
export function createCapsuleCollider(height, radius) {
    return {
        collider: Physics.ColliderDesc.capsule(height / 2, radius),
        shape: 'capsule',
        height,
        radius
    };
}
