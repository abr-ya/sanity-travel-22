import LeafletGeopointInput from 'sanity-plugin-leaflet-input';

const getPosition = (options) => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
  }
}

export default {
  name: 'post',
  type: 'document',
  title: 'Blog Post',
  initialValue: async () => ({
    location: await getPosition()
      .then(({coords}) => {
        const { latitude, longitude, altitude } = coords;

        const coordObj = {
          _type: 'geopoint',
          lat: latitude,
          lng: longitude,
          alt: altitude || undefined
        };
        console.log(coordObj);

        return coordObj;
      })
      .catch((e) => console.log(e)),
  }),
  fields: [
    {
      name: 'location',
      type: 'geopoint',
      title: 'Location',
      inputComponent: LeafletGeopointInput,
      options: {
        leaflet: {
          defaultLocation: {
            lat: 47.23,
            lng: 39.69,
          },
        },
      },
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
      source: 'title',
      maxLength: 100,
      },
    },
    {
      name: 'author',
      type: 'reference',
      title: 'Author',
      to: { type: 'author'},
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      options: {
      hotspot: true,
      },
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'reference', to: { type: 'category'}}]
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
    },
    {
      name: 'body',
      type: 'blockContent',
      title: 'Body',
    }
  ]
};
