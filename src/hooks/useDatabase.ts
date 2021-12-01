import React, { useEffect, useState } from "react";
import database from "../database";

export default function useDatabase() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await database.setupDatabase();
        setIsReady(true);
      } catch (error) {
        console.error(error);
      }
    }

    prepare();
  }, []);

  return isReady;
}
