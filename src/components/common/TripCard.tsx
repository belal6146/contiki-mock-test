import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TripCard.module.css';

// Assuming icon SVGs are available or imported elsewhere
import CalendarIcon from './icons/CalendarIcon'; // Placeholder
import PinIcon from './icons/PinIcon'; // Placeholder
import GlobeIcon from './icons/GlobeIcon'; // Placeholder
import AddCompareIcon from './icons/AddCompareIcon'; // Placeholder

interface TripCardProps {
  link: string;
  title: string;
  imageSources: Array<{ srcSet: string; media?: string; sizes?: string }>;
  imageSrc: string;
  imageAlt: string;
  saveAmount?: string;
  rating: number;
  days: number;
  places: number;
  countries: number;
  description: string;
  oldPrice?: string;
  price: string;
}

const TripCard: React.FC<TripCardProps> = ({
  link,
  title,
  imageSources,
  imageSrc,
  imageAlt,
  saveAmount,
  rating,
  days,
  places,
  countries,
  description,
  oldPrice,
  price,
}) => {
  return (
    <a href={link} title={title} data-testid="trip-card" className={`${styles.tripCard} trip-card hide-button`}>
      <div className={styles.imageSection} data-testid="image-section">
        <div className={styles.imageSection__topContainer}></div> {/* Placeholder */}
        <div className={styles.ratioBox}>
          <div className={styles.imageAnchor}>
            {saveAmount && (
              <div className={styles.highestAvailableSaving__label} data-testid="highest-available-saving__label">
                <div className={styles.tag__textSection}>
                  <p className={styles.textLabelM} data-testid="genericText">{`SAVE ${saveAmount}`}</p>
                </div>
              </div>
            )}
            <picture data-testid="image-section__image" className={`${styles.imageSection__image} image`}>
              {imageSources.map((source, index) => (
                <source key={index} data-sizes={source.sizes} data-srcset={source.srcSet} media={source.media} srcSet={source.srcSet} sizes={source.sizes} />
              ))}
              <img data-src={imageSrc} alt={imageAlt} className=" lazyloaded" draggable="true" src={imageSrc} />
            </picture>
          </div>
        </div>
      </div>

      <div className={`${styles.contentSection} content-section--layout1`} data-testid="content-section">
        <div className={styles.contentHeader} data-testid="content-header">
          <div className={styles.starsFullRating} data-testid="stars-full-rating">
            {/* Star Rating - This would need a proper implementation based on the rating value */}
            <div className={`${styles.ratingStars} rating-stars rating-stars--static`} data-testid="rating-stars">
              {/* Render stars based on rating prop */}
              {[...Array(5)].map((_, i) => (
                <span key={i} className={styles.ratingStars__star} data-testid="rating-stars-star"></span>
              ))}
               {/* This overlay part is for fractional stars if needed, more complex implementation needed */}
              {/* <div className={styles.ratingStars__boxActive}> */}
              {/*   {[...Array(5)].map((_, i) => ( */}
              {/*     <span key={i} className={`${styles.ratingStars__star} ${styles.ratingStars__starHalf}`} data-testid="rating-stars-star"></span> */}
              {/*   ))} */}
              {/* </div> */}
            </div>
            <p className={`${styles.starsFullRating__number} text-title-xxxs`} data-testid="stars-full-rating-number">{rating.toFixed(1)}</p>
          </div>
          <div className={styles.contentHeader__tagContainer}></div> {/* Placeholder for other tags */}
        </div>

        <div className={`${styles.contentTitle} hide-subtitle`} data-testid="content-title">
          <div>
            <h3 className={`${styles.contentTitle__title} text-h5`} data-testid="genericText">{title}</h3>
          </div>
        </div>

        <div className={styles.contentInfoPoints} data-testid="content-info-points">
          <div className={styles.contentInfoPoint} data-testid="content-info-point">
            <span data-testid="content-info-point__icon" className="icon-wrapper"> {/* Icon Placeholder */}
               {/* Replace with actual Calendar Icon component */}
               {/* <CalendarIcon className={styles.contentInfoPoint__icon} /> */}
               <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 14.92174 15.6849" className={`${styles.contentInfoPoint__icon} injected-svg icon`}><path d="M10.851,1.21925V.18756H9.811V1.21925H5.41936V.18756h-1.04V1.21925H.15476V15.87246H15.0765V1.21925ZM5.36356,12.73305H3.13945V10.50894H5.36356ZM5.36394,9.507H3.139V7.282H5.36394Zm3.36368,3.22608H6.50351V10.50894H8.72762ZM8.728,9.507H6.50313V7.282H8.728Zm3.36368,3.22608H9.86757V10.50894h2.22411ZM12.09206,9.507H9.86719V7.282h2.22487ZM14.03651,4.5192H1.19477V2.25925H4.37936V3.291h1.04V2.25925H9.811V3.29648h1.04V2.25925h3.18552Z" transform="translate(-0.15476 -0.18756)"></path></svg>
            </span>
            <p className={`${styles.contentInfoPoint__text} text-paragraph-xs`} data-testid="genericText">{`${days} Days`}</p>
          </div>
          <div className={styles.contentInfoPoint} data-testid="content-info-point">
            <span data-testid="content-info-point__icon" className="icon-wrapper"> {/* Icon Placeholder */}
              {/* Replace with actual Pin Icon component */}
               {/* <PinIcon className={styles.contentInfoPoint__icon} /> */}
              <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 48 48" className={`${styles.contentInfoPoint__icon} injected-svg icon`}><path d="M24,4A14.42,14.42,0,0,0,12.27,26.82L22.9,43.4a1.31,1.31,0,0,0,2.2,0L35.77,26.76A14.42,14.42,0,0,0,24,4Zm0,21a6.56,6.56,0,1,1,6.56-6.55A6.56,6.56,0,0,1,24,25Z"></path></svg>
            </span>
            <p className={`${styles.contentInfoPoint__text} text-paragraph-xs`} data-testid="genericText">{`${places} Places`}</p>
          </div>
          <div className={`${styles.contentInfoPoint} tooltip countries-tooltip link-style-underline`} data-testid="tooltip-trigger">
            <span data-testid="content-info-point__icon" className="icon-wrapper"> {/* Icon Placeholder */}
               {/* Replace with actual Globe Icon component */}
               {/* <GlobeIcon className={styles.contentInfoPoint__icon} /> */}
              <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 28 28.00291" className={`${styles.contentInfoPoint__icon} injected-svg icon`}><path d="M3.72946,11.50025q-.04869.1788-.09788.35758c-.12258.44382-.24952.90266-.343,1.35811-.07994.38859-.12791.79268-.17394,1.1832-.02229.18461-.04409.36872-.0688.55284-.00775.05814-.01987.1158-.03246.17395l-.01454.07025.00242,1.68662c.02084.14536.04167.30816.062.471.04361.34886.08867.70837.15214,1.05723a13.84824,13.84824,0,0,0,5.53323,8.88031,13.59506,13.59506,0,0,0,7.19369,2.66389.78336.78336,0,0,1,.14923.032l.05427.01454,1.737-.00291c.15408-.02229.32463-.04361.49518-.06493.35855-.04554.72775-.09109,1.0863-.157a13.92725,13.92725,0,0,0,7.61183-4.07482c-.09982-.01066-.19672-.02132-.29362-.03489a1.42636,1.42636,0,0,1-1.02041-.57077,1.36274,1.36274,0,0,1-.15795-1.10567,8.18718,8.18718,0,0,0,.17055-2.64161c-.03-.35564-.03682-.71806-.04457-1.06789-.00582-.2878-.01163-.57561-.03-.86245a3.5573,3.5573,0,0,0-.16474-.77717.70127.70127,0,0,0-.67542-.53879q-.82272-.05669-1.64641-.095a3.12855,3.12855,0,0,1-2.45071-1.44194,2.02208,2.02208,0,0,1-.24323-2.081,9.58627,9.58627,0,0,1,.57465-1.07563l.14438-.24711a1.11185,1.11185,0,0,0,.23064-.95063.71789.71789,0,0,1,.12016-.57949A5.88013,5.88013,0,0,1,22.386,10.742a1.0661,1.0661,0,0,1,1-.17346,14.29483,14.29483,0,0,0,3.77539.27811c.03683-.001.11338-.06638.15892-.10562l.02811-.02326A.32234.32234,0,0,0,27.393,10.631l.01454-.03391c.11822-.268.13566-.47387.05039-.59645-.1066-.15262-.37114-.17007-.56592-.156-.36242.02423-.72291.05475-1.08533.08479-.42541.03537-.85276.07123-1.27914.09739a7.21756,7.21756,0,0,1-.9797-.03.82753.82753,0,0,1-.74519-.56882,3.64369,3.64369,0,0,1-.064-2.51128A2.19073,2.19073,0,0,1,23.917,5.64384c.40409-.2001.81981-.37695,1.25975-.56446.12113-.05136.2442-.10321.36921-.157a13.87968,13.87968,0,0,0-7.48683-2.87612,1.29466,1.29466,0,0,1-.18169-.03149l-.07316-.016-1.67839.00242c-.1657.02278-.33189.04409-.4976.06541-.36048.046-.73259.09352-1.095.1565A13.65369,13.65369,0,0,0,10.33058,3.698c-.01406.00726-.02762.015-.04167.02325a3.27834,3.27834,0,0,0,2.17986.22579,16.05429,16.05429,0,0,1,1.9124-.32221,2.37092,2.37092,0,0,1,1.90611.61147A2.68974,2.68974,0,0,0,17.86,4.905a2.80149,2.80149,0,0,1,.53345.11774,1.36426,1.36426,0,0,1,1.0863,1.41238,10.27678,10.27678,0,0,1-.27714,1.94777A1.38126,1.38126,0,0,1,18.00878,9.4391a9.91291,9.91291,0,0,0-3.02292,1.03058,1.97353,1.97353,0,0,0-1.14057,1.423,1.37253,1.37253,0,0,1-1.00489,1.07515c-.50488.1502-1.0301.251-1.53836.34885l-.21513.04119c-.15747.03052-.48452.094-.52667.18751-.04264.09448.1313.38858.20544.51456.19235.32511.40409.64829.609.96032q.13227.20277.26358.40506a.46437.46437,0,0,0,.49227.22579c.09352-.01163.188-.01987.282-.02762.13325-.01115.266-.02229.39731-.04506a4.53314,4.53314,0,0,1,2.096.12694,13.98154,13.98154,0,0,1,3.64651,1.53981,2.51939,2.51939,0,0,1,1.23165,3.45755,5.88937,5.88937,0,0,1-1.02622,1.8625c-.29168.36823-.532.65991-.75876.91865a4.65942,4.65942,0,0,0-1.16382,2.5447,7.30246,7.30246,0,0,1-.45351,1.57954l-.04748.12889a2.37924,2.37924,0,0,1-.4884.75,1.37744,1.37744,0,0,1-1.09453.51747,1.31881,1.31881,0,0,1-.98455-.57948,4.80206,4.80206,0,0,1-.72872-1.42062c-.15844-.51747-.27715-1.05432-.39246-1.57276-.07559-.343-.15166-.68511-.23935-1.02524a11.19041,11.19041,0,0,0-.4414-1.34213,2.01466,2.01466,0,0,0-.83871-1.06594,3.504,3.504,0,0,1-1.74525-3.27149c-.00242-.08334-.00387-.16668-.00484-.251-.00291-.187-.00533-.38084-.02568-.56593a2.64128,2.64128,0,0,0-1.3586-1.96861l-.08818-.05862a21.452,21.452,0,0,1-2.06455-1.49136,8.41219,8.41219,0,0,1-2.06067-2.79617C3.76241,11.56227,3.74739,11.53126,3.72946,11.50025Z" transform="translate(-2.9988 -1.99879)"></path><path d="M9.03109,4.5842a.29452.29452,0,0,0-.15214.0344A13.873,13.873,0,0,0,4.432,9.85191a.28236.28236,0,0,0-.01889.18315,8.2271,8.2271,0,0,0,2.41194,3.65135,15.82119,15.82119,0,0,0,1.66337,1.16237l.17733.11241A3.66052,3.66052,0,0,1,10.537,17.79564c.02035.22288.02956.44673.03925.66961.00969.23547.01938.47095.04264.70449a1.83117,1.83117,0,0,0,.78492,1.55628,4.38863,4.38863,0,0,1,2.01658,2.86062c.11628.45157.21658.9138.31348,1.3615.0785.36145.1565.72291.2442,1.08339a4.27554,4.27554,0,0,0,.673,1.61927c.1003.13082.15456.1502.17782.15117h.00049c.02277,0,.07558-.01938.172-.14342a1.69533,1.69533,0,0,0,.27569-.45835c.03053-.08722.062-.17346.094-.26068a4.24529,4.24529,0,0,0,.27812-1.00005,5.79253,5.79253,0,0,1,1.55725-3.35967c.22433-.25.43752-.52038.64344-.782a4.13063,4.13063,0,0,0,.81981-1.52139l.01163-.04652c.27715-1.07854.31978-1.24425-.73986-1.95843a10.98917,10.98917,0,0,0-3.64021-1.48215,3.36666,3.36666,0,0,0-.9424-.06251c-.297.01066-.59644.04555-.861.07656-.1066.0126-.20834.02471-.30234.0344l-.01115.00048-.05039.00049a1.50165,1.50165,0,0,1-1.23213-.44625,6.55513,6.55513,0,0,1-1.488-2.51466,1.15408,1.15408,0,0,1,.674-1.45163,4.18479,4.18479,0,0,1,.813-.24032c.22191-.04845.44479-.08964.66767-.1313.25486-.047.50923-.09449.76167-.15214a.419.419,0,0,0,.37017-.32173,3.07539,3.07539,0,0,1,1.84506-2.223,10.50541,10.50541,0,0,1,3.07671-1.034c.38568-.06347.5039-.18848.57464-.609.03295-.19914.07074-.39779.10853-.59645l.031-.16425a.809.809,0,0,0-.0562-.63472.78659.78659,0,0,0-.56786-.23742,3.74011,3.74011,0,0,1-2.18568-.93464,1.27283,1.27283,0,0,0-1.07031-.34159,14.57283,14.57283,0,0,0-1.533.26019,4.4506,4.4506,0,0,1-2.9895-.19962,5.05843,5.05843,0,0,0-.814-.27182A.34512.34512,0,0,0,9.03109,4.5842Z" transform="translate(-2.9988 -1.99879)"></path></svg>
            </span>
            <p className={`${styles.contentInfoPoint__text} text-paragraph-xs`} data-testid="genericText">{`${countries} Countr${countries > 1 ? 'ies' : 'y'}`}</p>
          </div>
        </div>

        <div className={`${styles.contentBody} content-body--mobile-visible`} data-testid="content-body">
          <p className={`${styles.contentBody__text} rich-text text-paragraph-s`} data-testid="genericText">{description}</p>
        </div>

        <div className={`${styles.contentFooter} content-footer--layout1 content-footer__raq content-footer--align-right`} data-testid="content-footer">
          <button data-testid="btn" className={`${styles.compareButton} btn btn--M compare-button compare-button--add btn-sec btn--icon-Left`}> {/* Use appropriate button class */}
            <div className="add-to-compare-button"> {/* This div might have its own styles */}
              <span className="icon-wrapper"> {/* Icon Placeholder */}
                 {/* Replace with actual Add Compare Icon component */}
                 {/* <AddCompareIcon className={styles.compareButton__icon} /> */}
                 <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 48 48" className={`${styles.compareButton__icon} injected-svg icon`}><path d="M4,24A20,20,0,1,1,24,44,20,20,0,0,1,4,24ZM22,34.17a2,2,0,0,0,2,2,2,2,0,0,0,2-2V26h8.18a2,2,0,0,0,0-4H26V13.83a2,2,0,0,0-3.4-1.41A2,2,0,0,0,22,13.83V22H13.83a2,2,0,0,0-2,2,2,2,0,0,0,2,2H22Z" fill-rule="evenodd"></path></svg>
              </span>
              <span className="add-to-compare-button__text text-link-s" data-testid="genericText">Add to compare</span>
            </div>
          </button>
        </div>
      </div>

      <div className={styles.priceSection} data-testid="price-section">
        <div className={styles.priceSection__left}>
          {oldPrice && (
            <div className={styles.priceSection__leftTop}>
              <div className={styles.priceSection__leftOldPrice}>
                <p className={`${styles.textStrikethroughS} text-strikethrough-s`} data-testid="genericText">{oldPrice}</p>
              </div>
            </div>
          )}
          <div className={styles.priceSection__leftMiddle}>
            <p className={`${styles.priceSection__leftMiddleLabel} text-comm-xs`} data-testid="genericText">From</p>
            <p className={`${styles.priceSection__leftMiddleQuickPrice} text-comm-m`} data-testid="genericText">{price}</p>
          </div>
        </div>
        <div className={`${styles.priceSection__right} price-section__right--with-bigger-price`} data-testid="price-section__right">
          <button data-testid="btn" className={`${styles.priceSection__rightButton} ${styles.btnPr} btn btn--L price-section__right-button--fixed-width btn--icon-Left`} data-item-type="Product" data-item-name={title}>
             <p className={`${styles.textButtonL} text-button-l`} data-testid="genericText">VIEW TRIP</p>
          </button>
        </div>
      </div>
    </a>
  );
};

export default TripCard; 