// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))
export const getInitials = (user_full_name) => {
  const fullname = user_full_name.split(" ")
  const firstName = fullname[0]
  const lastName = fullname.pop()
  return (`${firstName[0]} ${lastName[0]}`)
}
/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'admin') return '/'
  if (userRole === 'client') return '/access-control'
  return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

export const formatChartData = (data: Array<any>, seriesLabels: Array<any>, categoriesLabel: string) => {
  return {
    series : seriesLabels.map(seriesLabel => (
          {
            label: seriesLabel ?? "",
            data: data.map(data => data[`${seriesLabel}`] ?? console.log("invalid series input to formatChartData"))
          }
        )
      ),
    categories : data.map(data => data[`${categoriesLabel}`] ?? console.log("invalid categories input to formatChartData"))
  }
}

export const formatToDateTime = (dateIs, sendMeBack = "date", spacing = ".", reverse = true) => {

  try {
    const _dateIs = new Date(dateIs)
    // const isoDateTime = new Date(_dateIs?.getTime() - (_dateIs?.getTimezoneOffset() * 60000))?.toISOString()
    if (sendMeBack === 'date') {
      // return (_dateIs && new Date(_dateIs.getTime() - (_dateIs.getTimezoneOffset() * 60000)).toISOString()?.split("T")[0]) || "1970-01-01"
      const dateTime = _dateIs && new Date(_dateIs.getTime() - (_dateIs.getTimezoneOffset() * 60000)).toISOString()?.split("T")[0]
      let formattedDate

      if (spacing && !reverse) { formattedDate = dateTime.replace("-", spacing) }
      if (reverse && spacing) { formattedDate = dateTime.split("-").reverse().join(spacing) }

      return formattedDate
    } else {
      const dateTime = (_dateIs && new Date(_dateIs.getTime() - (_dateIs.getTimezoneOffset() * 60000))?.toISOString().substring(0, 19)) || "1970-01-01T12:00:00"
      return dateTime.split("T").join(" ")
    }
  } catch (error) {
    console.log(error)
    return "1970-01-01"
  }
}

// Returns b64 string representation of file
export const fileToDataUri = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
      resolve(reader.result)
  }
})

// gets extention from b64
export async function getDataFromBase64(string) {
  const base64 = await fetch(string)
  const blob = await base64.blob()
  return {extension: blob.type.split("/")[1], fileType: blob.type, blob: blob}
}