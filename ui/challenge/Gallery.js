import Screen from "@/ui/challenge/Screen"
import Timer from "@/ui/challenge/Timer"

const Gallery = () => {
  return (
    <div className="grid grid-cols-1 gap-10 mx-auto md:grid-cols-2">
      <Screen day={0} description="About the challenge" link="/challenge/about">
        <Timer></Timer>
      </Screen>
      <Screen
        day={1}
        description="A delightful like button"
        link="/challenge/day-01"
      ></Screen>
    </div>
  )
}

export default Gallery