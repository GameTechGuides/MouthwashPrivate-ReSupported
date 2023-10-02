<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatchEvent = createEventDispatcher();

    import * as amongus from "@skeldjs/constant";
    import type { LoadedHatCosmeticImages, SomeLoadedCosmeticImages } from "../../lib/previewTypes";
    import { type Bundle } from "../../stores/accounts";
    import BundlePreviewList from "../Account/Cosmetics/BundlePreviewList.svelte";
    import CharacterOutfitPreview from "../Preview/CharacterOutfitPreview.svelte";
    import UserColorPicker from "../Account/Cosmetics/UserColorPicker.svelte";

    export let bundle: Bundle|undefined;
    export let playerColor: amongus.Color;

    let selectedItemId = "";
    let hatCosmetic: LoadedHatCosmeticImages|undefined = undefined;

    let bundlePreviewList: BundlePreviewList|undefined = undefined;

    function wearItem(cosmeticItem: SomeLoadedCosmeticImages) {
        if (cosmeticItem.asset.type === "HAT") {
            hatCosmetic = cosmeticItem;
        }
    }

    function onWearColor(ev: CustomEvent<amongus.Color>) {
        playerColor = ev.detail; // we don't want this to be committed to the player's cosmetics
    }
</script>

<button class="fixed left-0 top-0 w-full h-full flex items-center justify-center bg-[#000000b5] z-10 cursor-pointer" on:click={ev => dispatchEvent("close")}>
    <div class="flex gap-4 h-3/5">
        <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
        <div class="bg-surface-200 rounded-xl shadow-lg min-h-1/2 px-6 p-4 flex cursor-default" on:click={ev => ev.stopPropagation()}>
            <div class="flex flex-col items-start flex-1 gap-2">
                <span class="text-xl">Preview Character</span>
                <!--<p class="text-text-300 italic text-sm text-left">
                    Cosmetics in the {bundle.name} bundle are on the right,<br>
                    you can click them to see how they'd look on your<br>character before you buy.
                </p>-->
                <div class="flex flex-1 w-full">
                    <div class="flex-1 w-full h-full flex justify-center items-center px-8">
                        <CharacterOutfitPreview {playerColor} {hatCosmetic}/>
                    </div>
                </div>
            </div>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
        <div class="flex flex-col gap-4">
            <div class="bg-surface-200 rounded-xl shadow-lg px-6 p-4 flex cursor-default" on:click={ev => ev.stopPropagation()}>
                <div class="flex flex-col items-start flex-1 gap-4">
                    <span class="text-xl">Color</span>
                    <UserColorPicker
                        {playerColor}
                        on:wear-color={onWearColor}/>
                </div>
            </div>
            <div class="bg-surface-200 rounded-xl shadow-lg px-6 p-4 flex-1 flex cursor-default min-h-0" on:click={ev => ev.stopPropagation()}>
                <div class="flex flex-col items-start flex-1 gap-4 min-h-0">
                    <span class="text-xl">Preview Bundle</span>
                    <div class="flex flex-1 w-full min-h-0">
                        <div class="flex-[3_0_0] flex flex-col gap-4 min-h-0">
                            <BundlePreviewList
                                {playerColor}
                                bundle={{ ...bundle, owned_at: null }}
                                isOfficial={false}
                                small={false}
                                bind:selectedItemId
                                on:wear-item={ev => wearItem(ev.detail)}
                                on:cosmetics-ready={() => bundlePreviewList?.selectItem(0)}
                                bind:this={bundlePreviewList}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</button>