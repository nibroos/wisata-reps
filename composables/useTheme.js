export default function useTheme() {
  const enabled = useState(() => ({}))

  onMounted(() => {
    if (process.client) {
      enabled.value = localStorage.getItem("theme") === "dark" ? true : false
    }
  })


  const toggleTheme = () => {
    enabled.value = !enabled.value
    if (process.client) {
      localStorage.setItem("theme", enabled.value ? "dark" : "light")
    }
    setTheme()
  }

  function setTheme() {
    if (process.client) {
      const theme = localStorage.getItem("theme")
      if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.setAttribute("data-theme", "dark")
        document.documentElement.style.backgroundColor = "rgb(24 24 27)";
        //   enabled.value = true
      } else {
        document.documentElement.removeAttribute("data-theme")
        document.documentElement.style.backgroundColor = "rgb(255 255 255)";
        //   enabled.value = false
      }
    }
  }

  return {
    enabled,
    toggleTheme,
    setTheme,
  }
}