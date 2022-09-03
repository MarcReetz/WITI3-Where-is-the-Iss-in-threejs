import { describe, expect, test } from "vitest";
import {getPositionIss} from "./positionsCalc"

describe('getPositionIss :', () => {
  test('longituted: 0 and latitute 0 to equal x:0 y:0 z:1', () => {
    expect(getPositionIss(1,0,0)).toStrictEqual([0,0,1])
  }),
  test('longituted: 180 and latitute 0 to equal z:1', () => {
    expect(getPositionIss(1,180,0)[2]).toBe(-1)
  }),
  test('longituted: 0 and latitute 90 to equal z:1', () => {
    expect(getPositionIss(1,0,90)[1]).toBe(1)
  })
})
