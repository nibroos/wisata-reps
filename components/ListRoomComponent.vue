<template>
  <div class="text-zinc-900 dark:text-zinc-200">
    <div v-if="isLoadingProperty || isLoadingAvailabilities" class="w-full">
      <LoadingComponent :rows="5" :height="10" />
    </div>
    <div v-else-if="(Object.keys(props.property.data).length == 0 && props.property.status != 200)" class="w-full">
      <div class="flex flex-col w-full justify-center items-center">
        <div class="font-bold truncate">Oops! No result you're looking for</div>
        <div class="text-sm">Try another keyword</div>
      </div>
    </div>
    <div v-else class="flex flex-col gap-4 sm:gap-6 w-full sm:bg-zinc-100 dark:bg-zinc-900">
      <div v-for="(item, index) in property.data[propertyId].room" :key="index"
        class="flex flex-row gap-4 sm:gap-0 sm:flex-col sm:bg-white sm:dark:bg-zinc-950">

        <div class="hidden sm:flex flex-row sm:flex-col ms:!text-xs">
          <div
            class="flex flex-col gap-1 p-4 border sm:border-none border-zinc-300 dark:border-zinc-700 rounded-t-lg sm:rounded-none">
            <div class="font-bold ms:text-base">{{ item.name }}</div>
            <div v-for="(bed_group, bgIndex) in item.bed_groups" :key="bgIndex"
              class="flex flex-row gap-3 text-zinc-600 dark:text-zinc-400 font-medium items-center">
              <div v-if="bed_group.description" class="flex flex-row gap-1 items-center">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78c-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v5c0 .55.45 1 1 1s1-.45 1-1v-1h16v1c0 .55.45 1 1 1s1-.45 1-1v-5c0-.88-.39-1.67-1-2.22M14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1M5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5zm-1 7v-2c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v2z" />
                  </svg>
                </div>
                <span>{{ bed_group.description }}</span>
              </div>
              <div v-if="item.area?.square_meters > 0" class="flex flex-row gap-1 items-center">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M23 15h-2v2h2zm0-4h-2v2h2zm0 8h-2v2c1 0 2-1 2-2M15 3h-2v2h2zm8 4h-2v2h2zm-2-4v2h2c0-1-1-2-2-2M3 21h8v-4c0-1.1-.9-2-2-2H1v4c0 1.1.9 2 2 2M3 7H1v2h2zm12 12h-2v2h2zm4-16h-2v2h2zm0 16h-2v2h2zM3 3C2 3 1 4 1 5h2zm0 8H1v2h2zm8-8H9v2h2zM7 3H5v2h2z" />
                  </svg>
                </div>
                <span>{{ item.area?.square_meters ?? 0 }} m<sup>2</sup></span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-1 w-4/12 sm:w-full rounded-full z-20">
          <img :class="{ '!rounded-lg': item.images.length < 4 }"
            class="object-cover h-32 xl:h-40 2xl:h-48 sm:h-64 w-full rounded-t-lg sm:!rounded-none"
            :src="item.images[0].links['350px'].href" alt="">
          <div class="flex flex-row sm:flex-col gap-1" v-if="item.images.length > 3">
            <div v-for="(imageItem, imageIndex) in item.images.slice(1, 4)" :key="imageIndex"
              class="w-1/3 sm:w-full sm:grow">
              <img
                :class="{ 'rounded-bl-lg sm:rounded-none': imageIndex == 0, 'rounded-br-lg sm:rounded-none': imageIndex == 2 }"
                class="object-cover h-20 xl:h-28 2xl:h-36 w-full" :src="imageItem.links['350px'].href" alt="">
            </div>
          </div>
        </div>
        <div class="flex flex-col w-8/12 sm:w-full">
          <div
            class="flex flex-col gap-1 p-4 border sm:border-none border-zinc-300 dark:border-zinc-700 rounded-t-lg sm:rounded-none sm:hidden dark:bg-zinc-950">
            <div class="font-bold">{{ item.name }}</div>
            <div v-for="(bed_group, bgIndex) in item.bed_groups" :key="bgIndex"
              class="flex flex-row gap-3 text-sm text-zinc-600 dark:text-zinc-400 font-medium items-center">
              <div v-if="bed_group.description" class="flex flex-row gap-1 items-center">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78c-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v5c0 .55.45 1 1 1s1-.45 1-1v-1h16v1c0 .55.45 1 1 1s1-.45 1-1v-5c0-.88-.39-1.67-1-2.22M14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1M5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5zm-1 7v-2c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v2z" />
                  </svg>
                </div>
                <span>{{ bed_group.description }}</span>
              </div>
              <div v-if="item.area?.square_meters > 0" class="flex flex-row gap-1 items-center">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M23 15h-2v2h2zm0-4h-2v2h2zm0 8h-2v2c1 0 2-1 2-2M15 3h-2v2h2zm8 4h-2v2h2zm-2-4v2h2c0-1-1-2-2-2M3 21h8v-4c0-1.1-.9-2-2-2H1v4c0 1.1.9 2 2 2M3 7H1v2h2zm12 12h-2v2h2zm4-16h-2v2h2zm0 16h-2v2h2zM3 3C2 3 1 4 1 5h2zm0 8H1v2h2zm8-8H9v2h2zM7 3H5v2h2z" />
                  </svg>
                </div>
                <span>{{ item.area?.square_meters ?? 0 }} m<sup>2</sup></span>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div v-if="props.availabilities.status == 200" class="flex flex-col">
              <div v-for="(offer, offerIndex) in availabilities.data.offers" :key="offerIndex">
                <div :class="{
                  '!border-b !rounded-b-lg sm:!rounded-none': offerIndex == lowestHighestIndexByRoomId(offer.room_data.id, 0),
                  '!border-t-0': offerIndex == lowestHighestIndexByRoomId(offer.room_data.id, 1),
                  'sm:!border-b-0': offerIndex == lowestHighestIndexByRoomId(offer.room_data.id, 0),
                }"
                  class="flex flex-col gap-1 p-4 border-t border-x border-zinc-300 dark:border-zinc-700 dark:bg-zinc-950"
                  v-if="offer.room_data.id == item.id && filterByOptions(offer)">

                  <div class="flex flex-row ms:flex-col text-sm ms:text-xs">
                    <div class="flex flex-col gap-4 w-9/12 ms:w-full">

                      <div class="flex flex-col gap-1">
                        <div :class="{ 'text-emerald-600': !!offer.meal_plan_description }"
                          class="flex flex-row gap-2 items-center">
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                              <path fill="currentColor"
                                d="M18 3a1 1 0 0 1 .993.883L19 4v16a1 1 0 0 1-1.993.117L17 20v-5h-1a1 1 0 0 1-.993-.883L15 14V8c0-2.21 1.5-5 3-5m-6 0a1 1 0 0 1 .993.883L13 4v5a4.002 4.002 0 0 1-3 3.874V20a1 1 0 0 1-1.993.117L8 20v-7.126a4.002 4.002 0 0 1-2.995-3.668L5 9V4a1 1 0 0 1 1.993-.117L7 4v5a2 2 0 0 0 1 1.732V4a1 1 0 0 1 1.993-.117L10 4l.001 6.732a2 2 0 0 0 .992-1.563L11 9V4a1 1 0 0 1 1-1" />
                            </svg>
                          </div>
                          {{ !!offer.meal_plan_description ? offer.meal_plan_description : 'Without Breakfast' }}
                        </div>
                        <div :class="{ '!text-rose-600': offer.cancel_policy_code == 'NR' }"
                          class="flex flex-row gap-2 items-center text-emerald-600">
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                              <path fill="currentColor"
                                d="M21.775 18.925L20 17.15V12h-5.15l-4-4H20V6H8.85l-2-2H20q.825 0 1.413.588T22 6v12q0 .25-.05.488t-.175.437M9.15 12H4v6h11.15zm11.3 11.3l-3.3-3.3H4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4l2 2H4v2h1.15L.65 3.5l1.425-1.425l19.8 19.8z" />
                            </svg>
                          </div>
                          <div>{{ offer.cancel_policy_description }}</div>
                        </div>
                      </div>

                      <div class="flex flex-col gap-1 text-xs">
                        <div class="bg-orange-600 py-1 px-2 text-xs w-max text-white font-semibold">
                          SAVE {{ percentage(offer.pricing_data.saving_pct) }} TODAY!
                        </div>
                        <div class="text-xs font-semibold text-zinc-500">
                          <s>
                            {{ rupiah(offer.pricing_data.strikethrough_rate_nightly) }}
                          </s>
                        </div>
                        <div class="text-zinc-900 dark:text-white text-sm w-full whitespace-nowrap">
                          <div>
                            <span class="font-semibold">
                              {{ rupiah(offer.pricing_data.net_rate_nightly_with_bonus) }}</span> / night *
                          </div>
                        </div>
                        <div
                          v-if="offer.pricing_data.net_rate_nightly_with_bonus !== offer.pricing_data.net_price_total_with_bonus"
                          class="text-zinc-900 dark:text-white text-sm w-full whitespace-nowrap">
                          <div>Total <span>·</span> {{ rupiah(offer.pricing_data.net_price_total_with_bonus) }}</div>
                        </div>
                        <div class="text-zinc-400">
                          after tax & fee
                        </div>
                        <div class="hidden sm:flex flex-row items-center gap-2 w-9/12 text-zinc-400">
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true"
                              class="v-icon__svg" style="font-size: 8px; height: 8px; width: 8px;">
                              <path fill="currentColor"
                                d="M10,2H14L13.21,9.91L19.66,5.27L21.66,8.73L14.42,12L21.66,15.27L19.66,18.73L13.21,14.09L14,22H10L10.79,14.09L4.34,18.73L2.34,15.27L9.58,12L2.34,8.73L4.34,5.27L10.79,9.91L10,2Z">
                              </path>
                            </svg>
                          </div>
                          <span>Member-only price, valid in app only</span>
                        </div>
                      </div>

                    </div>

                    <div class="flex flex-col justify-end ms:justify-center w-3/12 ms:w-full ms:mt-4 ms:text-xs ms:gap-1">
                      <div
                        class="flex px-8 ms:px-4 py-2 ms:w-full w-max self-end text-center items-center justify-center bg-blue-600 hover:bg-blue-500 text-white cursor-pointer rounded-md font-semibold transition-all ease-in-out">
                        <div>Book Now</div>
                      </div>
                      <div v-if="offer.pricing_data.wisata_point > 0"
                        class="hidden ms:flex ms:w-full flex-row justify-end ms:justify-center items-center gap-1 w-3/12 text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" role="img"
                            aria-hidden="true">
                            <path fill="currentColor"
                              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z">
                            </path>
                          </svg>
                        </div>
                        <span>Collect {{ offer.pricing_data.wisata_point }} points</span>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-row text-xs mt-2 ms:hidden">
                    <div class="flex flex-row items-center gap-2 w-9/12 text-zinc-400">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true"
                          class="v-icon__svg" style="font-size: 8px; height: 8px; width: 8px;">
                          <path fill="currentColor"
                            d="M10,2H14L13.21,9.91L19.66,5.27L21.66,8.73L14.42,12L21.66,15.27L19.66,18.73L13.21,14.09L14,22H10L10.79,14.09L4.34,18.73L2.34,15.27L9.58,12L2.34,8.73L4.34,5.27L10.79,9.91L10,2Z">
                          </path>
                        </svg>
                      </div>
                      <span>Member-only price, valid in app only</span>
                    </div>
                    <div v-if="offer.pricing_data.wisata_point > 0"
                      class="flex flex-row justify-end items-center gap-1 w-3/12 text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" role="img"
                          aria-hidden="true">
                          <path fill="currentColor"
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z">
                          </path>
                        </svg>
                      </div>
                      <span>Collect {{ offer.pricing_data.wisata_point }} points</span>
                    </div>
                  </div>

                </div>
              </div>

              <div
                v-if="availabilities.data.offers.length === 0 || countReviewByRoomId(item.id) === 0 || countFilteredOffers(item.id) === 0"
                class="flex flex-col justify-center items-center gap-1 p-4 border-b border-x rounded-b-lg border-zinc-300 dark:border-zinc-700 dark:bg-zinc-950 min-h-32">

                Currently, no offers are available for this room.
              </div>
            </div>

            <div v-else
              class="flex flex-col justify-center items-center gap-1 p-4 border-b border-x rounded-b-lg border-zinc-300 dark:border-zinc-700 dark:bg-zinc-950 min-h-32">

              Currently, no offers are available for this room.
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { rupiah, percentage } from '../utils/numberTransform'

const props = defineProps({
  availabilities: {
    data: [],
    message: '',
    status: ''
  },
  property: {
    data: {},
    message: '',
    status: ''
  },
  propertyId: '',
  isLoadingProperty: false,
  isLoadingAvailabilities: false,
  isFreeBreakfast: 0,
  isFreeCancelation: 0,
})

const lowestHighestIndexByRoomId = (roomId, isLowest) => {
  let lowestHighestIndex = 0;
  let array = props.availabilities.data.offers;

  if (isLowest) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].room_data.id == roomId) {
        lowestHighestIndex = i;
        break;
      }
    }
  } else {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i].room_data.id == roomId) {
        lowestHighestIndex = i;
        break;
      }
    }
  }

  return lowestHighestIndex;
}

const countReviewByRoomId = (roomId) => {
  let count = 0;
  let array = props.availabilities.data.offers;

  for (let i = 0; i < array.length; i++) {
    if (array[i].room_data.id == roomId) {
      count++;
    }
  }

  return count;
}

const countFilteredOffers = (roomId) => {
  let count = 0;
  let array = props.availabilities.data.offers;

  for (let i = 0; i < array.length; i++) {

    if (
      array[i].room_data.id == roomId
    ) {
      let condition = true;
      if (isFreeBreakfast.value == 1 && array[i].meal_plan_code != 'BB') {
        condition = false;
      }

      if (isFreeCancelation.value == 1 && array[i].cancel_policy_code != 'FC') {
        condition = false;
      }

      if (!!condition) {
        count++;
      }
    }
  }

  return count;
}

const filterByOptions = (offer) => {

  let condition = true;

  if (isFreeBreakfast.value == 1 && offer.meal_plan_code != 'BB') {
    condition = false;
  }

  if (isFreeCancelation.value == 1 && offer.cancel_policy_code != 'FC') {
    condition = false;
  }

  return condition;
}

</script>