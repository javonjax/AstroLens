import Hero from './Hero';
import NavCard from './NavCard';

const cards: { [key: string]: string }[] = [
  {
    title: 'EPIC Images',
    text: `See Earth from a stunning new perspective. NASA's Earth Polychromatic Imaging Camera (EPIC) provides awe-inspiring images our planet.`,
    imgName: 'earth.webp',
    path: 'epic'
  },
  {
    title: 'Astronomy Picture of the Day',
    text: `Explore the wonders of the universe. Every day, NASA brings you a stunning image that showcases the beauty and mystery of space.`,
    imgName: 'milky_way.jpg',
    path: 'apod'
  },
  {
    title: 'NASA Image and Video Explorer',
    text: `Dive into NASA's vast archive of images and videos. Whether it's the beauty of space, the science behind space missions, or epic launch moments, this collection has something for everyone.`,
    imgName: 'moon_landing.jpg',
    path: 'explorer'
  },
];

const Homepage = () => {
  return (
    <>
      <Hero />
      <div className='flex flex-col w-full max-w-7xl mt-4'>
        {cards.map((card, idx) => (
          <NavCard
            title={card.title}
            text={card.text}
            imgName={card.imgName}
            side={idx % 2 === 0 ? 'left' : 'right'}
            path={card.path}
          />
        ))}
      </div>
    </>
  );
};

export default Homepage;
