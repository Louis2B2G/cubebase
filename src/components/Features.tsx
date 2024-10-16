import React, { useRef } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Card {
  title: string;
  subtitle: string;
  image_path: string;
  image_scale: number; // Add this line
}

interface FeaturesProps {
  title: string;
  subtitle: string;
  logo_path: string;
  cards: Card[];
}

const FeaturesContainer = styled.div`
  position: relative;
  padding: 40px;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  max-width: 200px;
  height: auto;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const TitleSubtitleWrapper = styled.div``;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: #666;
  font-weight: bold;
`;

const FeaturesCardsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 20px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const FeatureCard = styled.div`
  background-color: #333;
  color: white;
  border-radius: 10px;
  padding: 20px;
  width: 350px;
  height: 350px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  scroll-snap-align: start;
`;

const CardContent = styled.div`
  z-index: 1;
  margin-bottom: 40px; // Increased space between content and image
`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 10px;
  font-weight: bold;
`;

const CardSubtitle = styled.p`
  font-size: 14px;
  margin: 0;
`;

const CardImage = styled.img<{ scaleFactor: number }>`
  width: 140%;
  position: absolute;
  bottom: -10%;
  right: -20%;
  transform: rotate(-5deg) scale(${props => props.scaleFactor});
  transition: all 0.3s ease-in-out;
  transform-origin: bottom right;

  ${FeatureCard}:hover & {
    transform: rotate(0deg) translateX(-25%) scale(${props => props.scaleFactor * 0.9});
  }
`;

const ArrowContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ArrowButton = styled.button`
  background-color: transparent;
  color: #D1D5DB; // Light grey color
  border: 1px solid #D1D5DB;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(209, 213, 219, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(209, 213, 219, 0.5);
  }
`;

const Features: React.FC<FeaturesProps> = ({ title, subtitle, logo_path, cards }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      const targetScroll = container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <FeaturesContainer>
      <LogoContainer>
        <Logo src={logo_path} alt="Logo" />
      </LogoContainer>
      <TitleContainer>
        <TitleSubtitleWrapper>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TitleSubtitleWrapper>
        <ArrowContainer>
          <ArrowButton onClick={() => scroll('left')} aria-label="Scroll left">
            <ChevronLeft size={20} />
          </ArrowButton>
          <ArrowButton onClick={() => scroll('right')} aria-label="Scroll right">
            <ChevronRight size={20} />
          </ArrowButton>
        </ArrowContainer>
      </TitleContainer>
      <FeaturesCardsContainer ref={scrollContainerRef}>
        {cards.map((card, index) => (
          <FeatureCard key={index}>
            <CardContent>
              <CardTitle>{card.title}</CardTitle>
              <CardSubtitle>{card.subtitle}</CardSubtitle>
            </CardContent>
            <CardImage 
              src={card.image_path} 
              alt={card.title} 
              scaleFactor={card.image_scale}
            />
          </FeatureCard>
        ))}
      </FeaturesCardsContainer>
    </FeaturesContainer>
  );
};

export default Features;
