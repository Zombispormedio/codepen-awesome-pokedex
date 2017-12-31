import idb from "idb"
import { DB_NAME, POKEMON_OBJECT_STORE } from "../constants"

export const dbPromise = idb.open(DB_NAME, 1, function(upgradeDb) {
	switch (upgradeDb.oldVersion) {
	case 0:
		upgradeDb.createObjectStore(POKEMON_OBJECT_STORE, { keyPath: "id" })
	}
})
