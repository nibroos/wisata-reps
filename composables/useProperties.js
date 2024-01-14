export default function () {
  const config = useRTConfig()
  const properties = ref({
    data: [],
    status: 0,
    message: ''
  })
  const property = ref({
    data: {},
    status: 0,
    message: '',
    meta: {
      title: '',
      description: '',
    }
  })
  const availabilities = ref({})

  const isLoadingProperties = ref(false)
  const isLoadingProperty = ref(false)
  const isLoadingAvailabilities = ref(false)

  const initialLoadProperties = ref(true)
  const initialLoadProperty = ref(true)
  const initialLoadAvailabilities = ref(true)

  const getProperties = async (
    query = ''
  ) => {
    isLoadingProperties.value = true;
    initialLoadProperties.value = false;

    $fetch(config.public.API_BASE_URL + 'property/fts?query=' + query, {
      method: 'GET',
    })
      .then(res => {
        if (Object.keys(res).length > 0) {
          properties.value = {
            data: res,
            status: 200,
            message: res.message ? res.message : ''
          }
        } else {
          properties.value = {
            data: [],
            status: 404,
            message: 'Not Found'
          }
        }
      })
      .catch(err => {
        properties.value = {
          data: [],
          status: err.status ?? 0,
          message: err.response._data.detail.name ?? ''
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
    initialLoadProperty.value = false;

    $fetch(config.public.API_BASE_URL + 'property?id=' + id, {
      method: 'GET',
    })
      .then(res => {

        if (Object.keys(res).length > 0) {
          property.value = {
            data: res,
            status: 200,
            message: res.message ? res.message : '',
            meta: {
              title: res[id].name ?? '',
              description: res[id].general_info.descriptions.headline ?? ''
            }
          }
        } else {
          property.value = {
            data: {},
            status: 404,
            message: 'Not Found',
            meta: {
              title: 'Not Found',
              description: 'Oops! Something went wrong.'
            }
          }
        }
      })
      .catch(err => {
        property.value = {
          data: {},
          status: err.status ?? 0,
          message: err.response._data.detail.name ?? '',
          meta: {
            title: 'Oops! Something went wrong.',
            description: ''
          }
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
    initialLoadAvailabilities.value = false;

    $fetch(config.public.API_BASE_URL + 'property/availability/' + id +
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
        console.log(err);
        console.log(err.response);
        availabilities.value = {
          data: [],
          status: err.response.status ?? 0,
          message: err.response._data.detail.name ?? ''
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
    getAvailabilities,
    initialLoadProperty,
    initialLoadProperties,
    initialLoadAvailabilities
  }
}
