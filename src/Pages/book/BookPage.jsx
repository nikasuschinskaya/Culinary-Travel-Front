import React from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./book.module.css";
import { Button } from "react-bootstrap";

export const BookPage = () => {
  const { shortName } = useParams();

  return (
        <div className={styles["book-container"]}>
            <h2>Страна: {shortName}</h2>
            {/* <Link to={`/book/${shortName}/${orderal}/pazzle`}> */}
            <Link to={`/book/${shortName}/1/pazzle`}>
                <Button variant="secondary" className={styles.button}> Первое блюдо </Button>
            </Link>
            <Button variant="secondary" className={styles.button}> Второе блюдо </Button>
            <Button variant="secondary" className={styles.button}> Третье блюдо </Button>
        </div>
    );
};