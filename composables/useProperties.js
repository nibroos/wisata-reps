export default function () {
  const config = useRTConfig()
  const properties = ref({
    data: [],
    status: 0,
    message: ''
  })
  const property = ref({})
  const availabilities = ref({})

  const isLoadingProperties = ref(false)
  const isLoadingProperty = ref(false)
  const isLoadingAvailabilities = ref(false)

  const getProperties = async (
    query = ''
  ) => {
    isLoadingProperties.value = true;
    $fetch(config.public.BASE_URL + 'property/fts?query=' + query, {
      method: 'GET',
    })
      .then(res => {
        properties.value = {
          data: res,
          status: 200,
          message: res.message ? res.message : ''
        }
      })
      .catch(err => {
        properties.value = {
          data: [],
          status: err.status,
          message: err.response._data.detail.name ? err.response._data.detail.name : ''
        }
      })
      .finally(() => {
        isLoadingProperties.value = false;
      });
  }

  const getProperty = async (
    id = ''
  ) => {
    isLoadingProperty.value = true;
    $fetch(config.public.BASE_URL + 'property?id=' + id, {
      method: 'GET',
    })
      .then(res => {
        property.value = {
          data: res,
          status: 200,
          message: res.message ? res.message : ''
        }
      })
      .catch(err => {
        property.value = {
          data: [],
          status: err.status,
          message: err.response._data.detail.name ? err.response._data.detail.name : ''
        }
      })
      .finally(() => {
        isLoadingProperty.value = false;
      });
  }

  const getAvailabilities = async (
    id = '',
    checkin = '2024-06-25',
    checkout = '2024-06-26',
    number_of_room = 1,
    guest_per_room = 2
  ) => {
    isLoadingAvailabilities.value = true;
    $fetch(config.public.BASE_URL + 'property/availability/' + id +
      '?checkin=' + checkin +
      '&checkout=' + checkout +
      '&number_of_room=' + number_of_room +
      '&guest_per_room=' + guest_per_room
      , {
        method: 'GET',
      })
      .then(res => {
        availabilities.value = {
          data: res,
          status: 200,
          message: res.message ? res.message : ''
        }
      })
      .catch(err => {
        availabilities.value = {
          data: [],
          status: err.status,
          message: err.response._data.detail.name ? err.response._data.detail.name : ''
        }
      })
      .finally(() => {
        isLoadingAvailabilities.value = false;
      });
  }

  return {
    isLoadingProperties,
    properties,
    getProperties,
    isLoadingProperty,
    property,
    getProperty,
    isLoadingAvailabilities,
    availabilities,
    getAvailabilities
  }
}
