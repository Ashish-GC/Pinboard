export function convertToDMS(
  lat: number,
  lng: number
): { latDMS: string; lngDMS: string } {
  const convert = (coord: number, isLat: boolean): string => {
    const absCoord = Math.abs(coord);
    const degrees = Math.floor(absCoord);
    const minutes = Math.floor((absCoord - degrees) * 60);
    const seconds = ((absCoord - degrees - minutes / 60) * 3600).toFixed(1);

    const direction = isLat ? (coord >= 0 ? "N" : "S") : coord >= 0 ? "E" : "W";

    return `${degrees}°${minutes}'${seconds}"${direction}`;
  };

  return {
    latDMS: convert(lat, true),
    lngDMS: convert(lng, false),
  };
}
