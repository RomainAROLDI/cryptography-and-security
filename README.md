# Cryptographie et sécurité

## Table des Matières

1. [Lancement du projet](#lancement-du-projet)
2. [Introduction](#introduction)
3. [Tables de substitution (S-Box et Inv S-Box)](#tables-de-substitution)
4. [Opérations Galois (gf256)](#operations-galois)
5. [Fonctions de base](#fonctions-de-base)
6. [Transformation des clés et leur expansion](#transformations-et-expansion-de-cles)
7. [Chiffrement AES](#chiffrement-aes)
8. [Déchiffrement AES](#dechiffrement-aes)
9. [Fonctions auxiliaires](#fonctions-auxiliaires)

---

## Lancement du projet

### Installation des dépendances

Pour installer les dépendances, exécutez :

```bash
bun install
```

### Lancer le projet

Pour exécuter le projet :

```bash
bun run index.ts
```

### Informations supplémentaires

Ce projet a été créé en utilisant `bun init` avec la version 1.1.34 de Bun. [Bun](https://bun.sh) est un environnement
d'exécution JavaScript rapide et tout-en-un.

---

## Introduction

Ce document détaille la structure et les fonctions du fichier `aes.ts` qui implémente un chiffrement et un déchiffrement
basés sur AES (Advanced Encryption Standard). Les fonctions principales incluent :

- `aesEncrypt` : Fonction de chiffrement AES.
- `aesDecrypt` : Fonction de déchiffrement AES.

Les opérations utilisent l'algèbre sur le corps fini GF(256) pour certaines transformations clés.

---

## Tables de substitution

### S-Box

La S-Box (`s_box`) est une table de substitution utilisée lors du chiffrement. Chaque octet est substitué par un autre
en utilisant cette table :

```typescript
const s_box = [...];
```

### Inv S-Box

La table inverse de substitution (`inv_s_box`) est utilisée lors du déchiffrement :

```typescript
const inv_s_box = [...];
```

Ces tables jouent un rôle crucial dans l'étape de `SubBytes` et `InvSubBytes`.

---

## Opérations Galois

### Multiplication dans GF(256)

```typescript
export const gmul = (a: number, b: number): number => { ... }
```

Cette fonction implémente la multiplication de deux éléments dans le corps fini GF(256). Elle utilise des décalages de
bits et des XOR pour effectuer l'opération.

---

## Fonctions de base

### Fonction `rc`

```typescript
const rc = (i: number): number => { ... }
```

Cette fonction calcule la constante ronde pour une itération donnée dans le cadre de l'expansion de clé.

### Fonction `srd`

```typescript
const srd = (i: number): number => {
    return s_box[i];
}
```

Permet de substituer un octet en utilisant la S-Box.

---

## Transformations et expansion de clés

### Transformation de clé

```typescript
const transformKey = (key: number[]): number[][] => { ... }
```

Cette fonction transforme une clé plate en une matrice 4x4.

### Expansion de clé

```typescript
export const keyExpansion = (k: number[]): number[][] => { ... }
```

Génère un ensemble de clés rondes (44 colonnes pour AES-128) nécessaires pour chaque tour du chiffrement.

---

## Chiffrement AES

### Fonction `aesEncrypt`

```typescript
export const aesEncrypt = (message: number[], expandedKey: number[][]): number[] => { ... }
```

Cette fonction implémente les étapes suivantes :

1. **AddRoundKey** : XOR de l'état initial avec la clé ronde initiale.
2. 9 Rounds complets :
    - `SubBytes`
    - `ShiftRows`
    - `MixColumns`
    - `AddRoundKey`
3. Dernier Round (sans `MixColumns`).

---

## Déchiffrement AES

### Fonction `aesDecrypt`

```typescript
export const aesDecrypt = (cipherText: number[], expandedKey: number[][]): number[] => { ... }
```

Effectue le processus inverse :

1. **AddRoundKey** avec la dernière clé ronde.
2. 9 Rounds complets inversés :
    - `InvShiftRows`
    - `InvSubBytes`
    - `AddRoundKey`
    - `InvMixColumns`
3. Dernier Round (sans `InvMixColumns`).

---

## Fonctions auxiliaires

### SubBytes / InvSubBytes

Ces fonctions remplacent chaque octet de l'état avec la S-Box ou son inverse :

```typescript
const subBytes = (state: number[][]): void => { ... }

const invSubBytes = (state: number[][]): void => { ... }
```

### ShiftRows / InvShiftRows

Ces fonctions permutent les lignes de l'état :

```typescript
const shiftRows = (state: number[][]): void => { ... }

const invShiftRows = (state: number[][]): void => { ... }
```

### MixColumns / InvMixColumns

Ces fonctions effectuent une transformation linéaire colonne par colonne sur l'état :

```typescript
const mixColumns = (state: number[][]): void => { ... }

const invMixColumns = (state: number[][]): void => { ... }
```

### AddRoundKey

Applique un XOR entre l'état et la clé ronde :

```typescript
const addRoundKey = (state: number[][], key: number[][]): void => { ... }
```
