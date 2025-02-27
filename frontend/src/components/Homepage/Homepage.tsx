import Hero from './Hero';
import NavCard from './NavCard';

const cards: { [key: string]: string }[] = [
  {
    title: 'Astronomy Picture of the Day',
    text: `Explore the wonders of the universe. Every day, NASA brings you a stunning image that showcases the beauty and mystery of space.`,
    imgName: 'milky_way.jpg',
    path: 'apod',
  },
  {
    title: 'NASA Multimedia Library',
    text: `Dive into NASA's vast archive of images and videos. Whether it's the beauty of space, the science behind space missions, or epic launch moments, this collection has something for everyone.`,
    imgName: 'moon_landing.jpg',
    path: 'explorer',
  },
  {
    title: 'EPIC Images',
    text: `See Earth from a stunning new perspective. NASA's Earth Polychromatic Imaging Camera (EPIC) provides awe-inspiring images our planet.`,
    imgName: 'earth.webp',
    path: 'epic',
  },
];

const Homepage = (): React.JSX.Element => {
  return (
    <>
      <Hero />
      <div
        id='homepage-nav-cards'
        className='flex w-full max-w-7xl flex-col p-4'
      >
        {cards.map((card, idx) => (
          <NavCard
            key={card.title}
            title={card.title}
            text={card.text}
            imgName={card.imgName}
            side={idx % 2 === 0 ? 'left' : 'right'}
            path={card.path}
            delay={(idx + 1) * 0.5}
          />
        ))}
      </div>
    </>
  );
};

export default Homepage;
