<svelte:options runes={true} />

<script lang="ts">
    import { page } from "$app/stores";
    import type { FullItem, PartialUser } from "./ItemCard.svelte";
    import { stopPropagation } from "$lib/button-modifiers";

    interface Props {
        item: FullItem;
        user?: PartialUser;
        showName?: boolean;
        onPublicList?: boolean;
        onunclaim: VoidFunction;
        onclaim: VoidFunction;
        onpurchase: (purchased: boolean) => void;
    }
    let { item, user, showName = false, onPublicList = false, onunclaim, onclaim, onpurchase }: Props = $props();
</script>

{#if !onPublicList && user?.username === $page.params?.username}
    <div />
{:else if item.pledgedBy || item.publicPledgedBy}
    {#if !onPublicList && item.pledgedBy?.username === user?.username}
        <div class="flex flex-row space-x-2 md:space-x-4">
            <button class="variant-ghost-secondary btn btn-sm md:btn" onclick={stopPropagation(onunclaim)}>
                Unclaim
            </button>
            <label class="unstyled flex items-center space-x-2 text-sm md:text-base">
                <input
                    class="checkbox"
                    onchange={(event) => onpurchase(event.currentTarget?.checked)}
                    onclick={(e) => e.stopPropagation()}
                    type="checkbox"
                    bind:checked={item.purchased}
                />
                <span>Purchased</span>
            </label>
        </div>
    {:else if showName}
        <span>Claimed by {item.publicPledgedBy ? item.publicPledgedBy?.name : item.pledgedBy?.name}</span>
    {:else}
        <span>Claimed</span>
    {/if}
{:else}
    <button class="variant-filled-secondary btn btn-sm md:btn" onclick={stopPropagation(onclaim)}>Claim</button>
{/if}
