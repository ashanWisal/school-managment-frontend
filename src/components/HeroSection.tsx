import heroImage from '../assets/image1.jpg'

const HeroSection = () => {
    return (
        <div className="relative h-screen">
            <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />

            <div className="absolute top-1/3 left-8 transform -translate-y-1/2 w-1/2 backdrop-blur-md p-6 rounded-lg text-white">
                <h1 className="text-4xl font-bold drop-shadow-lg">
                    Bright Future Academy
                </h1>
                <p className="text-lg mt-2 drop-shadow-md">
                    Bright Future Academy is a modern educational institution dedicated to nurturing young minds and preparing students for a successful future. With a focus on academic excellence, character building, and innovation, the academy provides a supportive environment where students can grow, learn, and thrive. At Bright Future Academy, every child is encouraged to reach their full potential and become confident, responsible individuals ready to shape the world.
                </p>
            </div>
        </div>
    )
}

export default HeroSection
