import Hero from './Hero';
import NavCard from './NavCard';

const cards: { [key: string]: string }[] = [
  {
    title: 'Astronomy Picture of the Day',
    text: `Explore the wonders of the universe. Every day, NASA brings you a stunning image that highlights the beauty of astronomy.`,
    imgName: 'rocket_launch.webp',
    path: 'apod',
  },
  {
    title: 'NASA Multimedia Library',
    text: `Dive into NASA's vast archive of images and videos. This collection showcases NASA's missions, space exploration, and scientific discoveries.`,
    imgName: 'moon_landing.webp',
    path: 'library',
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
        className='flex w-full max-w-7xl flex-wrap justify-center gap-4 p-4'
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
