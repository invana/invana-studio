import {
    IconDefinition,   
} from '@fortawesome/fontawesome-svg-core'
import { Icon } from '@rsuite/icons';

  
  const FaSvgIcon = ({ faIcon, ...rest }: {faIcon: IconDefinition}) => {
    // @ts-ignore:
    // const { width, height, svgPathData } = faIcon.icon;
    const svgPathData = faIcon.icon[4];
    if (svgPathData){
      return (
        <svg {...rest} viewBox={`0 0 ${faIcon.icon[0]} ${faIcon.icon[1]}`}  fill="currentColor">
          {/*
          // @ts-ignore */}
          <path d={svgPathData}></path>
        </svg>
      );
    }
  };
  

export const FontAwesomeIcon = ({icon}: {icon: IconDefinition}) => {
      {/*
          // @ts-ignore */}
    return <Icon as={FaSvgIcon} faIcon={icon} />
  }

 