<template>
  <div class="text-zinc-900 dark:text-zinc-200 h-screen">
    <div v-if="isLoadingProperty || isLoadingAvailabilities" class="w-full">
      <LoadingComponent :rows="5" :height="10" />
    </div>
    <div v-else-if="Object.keys(props.property.data).length == 0 && props.property.status != 200" class="w-full">
      <div class="flex flex-col w-full justify-center items-center">
        <div class="font-bold truncate">Oops! No result you're looking for</div>
        <div class="text-sm">Try another keyword</div>
      </div>
    </div>
    <div v-else class="flex flex-col gap-4 w-full">
      <div v-for="(item, index) in property.data[propertyId].room" :key="index" class="flex flex-row gap-4">
        <div class="flex flex-col gap-1 w-4/12 rounded-full z-20">
          <img :class="{ '!rounded-lg': item.images.length < 4 }" class="object-cover h-32 w-full rounded-t-lg"
            :src="item.images[0].links['350px'].href" alt="">
          <div class="flex flex-row gap-1" v-if="item.images.length > 3">
            <div v-for="(imageItem, imageIndex) in item.images.slice(1, 4)" :key="imageIndex" class="w-1/3">
              <img :class="{ 'rounded-bl-lg': imageIndex == 0, 'rounded-br-lg': imageIndex == 2 }"
                class="object-cover h-20 w-full" :src="imageItem.links['350px'].href" alt="">
            </div>
          </div>
        </div>
        <div class="flex flex-col w-8/12">
          <div class="flex flex-col gap-1 p-4 border border-zinc-300 rounded-t-lg">
            <div class="font-bold">{{ item.name }}</div>
            <div v-for="(bed_group, bgIndex) in item.bed_groups" :key="bgIndex"
              class="flex flex-row gap-3 text-sm text-zinc-500 font-medium items-center">
              <div class="flex flex-row gap-1 items-center">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78c-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v5c0 .55.45 1 1 1s1-.45 1-1v-1h16v1c0 .55.45 1 1 1s1-.45 1-1v-5c0-.88-.39-1.67-1-2.22M14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1M5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5zm-1 7v-2c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v2z" />
                  </svg>
                </div>
                <span>{{ bed_group.description }}</span>
              </div>
              <div class="flex flex-row gap-1 items-center">
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
            <div v-for="(offer, offerIndex) in availabilities.data.offers" :key="offerIndex">
              <div :class="{
                '!border-b !rounded-b-lg': offerIndex == lowestHighestIndexByRoomId(offer.room_data.id, 0),
                '!border-t-0 ': offerIndex == lowestHighestIndexByRoomId(offer.room_data.id, 1)
              }" class="flex flex-col gap-1 p-4 border-t border-x border-zinc-300"
                v-if="offer.room_data.id == item.id">
                {{ offerIndex }} - {{ availabilities.data.offers.length - 1 }}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
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
  isLoadingAvailabilities: false
})

const lowestHighestIndexByRoomId = (roomId, isLowest) => {
  let lowestHighestIndex = 0;
  let array = props.availabilities.data.offers;
  // for (let i = 0; i < array.length; i++) {


  //   if (array[i].room_data.id == roomId) {
  //     if (isLowest) {
  //       if (array[i].room_data.id == roomId) {
  //         lowestHighestIndex = i;
  //         break;
  //       }
  //     } else {
  //       if (array[i].room_data.id == roomId) {
  //         lowestHighestIndex = i;
  //       }
  //     }
  //   }
  // }
  // return lowestHighestIndex;

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

</script>
