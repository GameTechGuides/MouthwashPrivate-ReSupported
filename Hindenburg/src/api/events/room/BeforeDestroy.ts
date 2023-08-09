import { DisconnectReason } from "@skeldjs/constant";
import { CancelableEvent } from "@skeldjs/events";
import { Hostable } from "@skeldjs/core";

/**
 * Emitted just before a room is destroyed.
 *
 * See {@link RoomDestroyEvent} to guarantee that the room has been destroyed
 * and cannot be brought back.
 */
export class RoomBeforeDestroyEvent<RoomType extends Hostable = Hostable> extends CancelableEvent {
    static eventName = "room.beforedestroy" as const;
    eventName = "room.beforedestroy" as const;

    constructor(
        /**
         * The room that is being destroyed.
         */
        public readonly room: RoomType,
        /**
         * Reason for why the room will be destroyed.
         */
        public readonly reason: DisconnectReason
    ) {
        super();
    }
}
