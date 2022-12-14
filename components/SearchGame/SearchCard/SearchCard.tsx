import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../../../styles/SearchGame/SearchCard/SearchCard.module.css'
import '@fortawesome/fontawesome-free/css/all.css';
import { motion } from 'framer-motion';
import {useContext} from "react";
import AppContext from "../../../context/AppContext";
import noImg from '../../../public/assets/images/no-img.jpeg'

type Props = {
   name: string;
   genre: string;
   platforms?: [any];
   img: string;
}


const SearchCard: NextPage<Props> = (props) => {
    const context: any = useContext(AppContext);

    //Fonction d'ajout du choix recherché dans la bonne colonne
    const addCardToColumn = (
        name: string,
        genre: string,
        platforms: any,
        img: string,
    ) => {
        let newGame:any
            newGame = {
                id: name,
                name: name,
                genre: genre,
                platforms: platforms.length > 0 ? platforms : [],
                img: img
        }

        context.newGame(newGame)
    }

    const { name, genre, platforms, img } = props;

  return (
    <motion.button
        onClick={() => addCardToColumn(name, genre, platforms, img)}
        className={styles.card}
    >
        <article>
            <Image unoptimized={true}
                   src={img !== null ? img : noImg}
                   alt={name} width={'100%'}
                   height={'100%'}
                   className={styles.image}
            />
            <div className={styles.main}>
                <h4>{name}</h4>
                <div className={styles.list}>
                    <div className={styles.li}>
                        <p>Genre: <span>{genre}</span></p>
                    </div>
                    <div className={styles.li}>
                        <p>Platforms: <span>{platforms}</span></p>
                    </div>
                </div>
            </div>
        </article>
    </motion.button>
  )
}

export default SearchCard
