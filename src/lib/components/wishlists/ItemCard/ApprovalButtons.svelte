<svelte:options runes={true} />

<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { stopPropagation } from "$lib/button-modifiers";
    import type { FullItem, PartialUser } from "./ItemCard.svelte";

    interface Props {
        item: FullItem;
        user?: PartialUser;
        onapprove: VoidFunction;
        ondeny: VoidFunction;
        ondelete: VoidFunction;
    }
    let { item, user, onapprove, ondeny, ondelete }: Props = $props();
</script>

<div class="flex flex-row space-x-2 md:space-x-4">
    {#if !item.approved}
        <button class="variant-filled-success btn btn-sm md:btn" onclick={stopPropagation(onapprove)}>Approve</button>
        <button class="variant-filled-error btn btn-sm md:btn" onclick={stopPropagation(ondeny)}>Deny</button>
    {:else if user?.username === item.user?.username || user?.username === item.addedBy?.username}
        <button
            class="variant-ghost-primary btn btn-sm md:btn"
            onclick={() => goto(`/wishlists/${item.user?.username}/edit/${item.id}?ref=${$page.url}`)}
        >
            Edit
        </button>
        <button class="variant-filled-error btn btn-sm md:btn" onclick={stopPropagation(ondelete)}>Delete</button>
    {/if}
</div>
