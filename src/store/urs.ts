type DataKeyType = "lat" | "lng" | "zoom";
type DataType = Partial<Record<DataKeyType, number>>;

const dataKeys: DataKeyType[] = ["lat", "lng", "zoom"];

export function withUrlSearch(url: string) {
  return url + window.location.search;
}

export function getDataFromUrl() {
  const params = new URL(document.location as any).searchParams;
  // debugger;
  const res: DataType = {};

  dataKeys.forEach((key) => {
    const value = +(params.get(key) || "");
    if (typeof value === "number" && !Number.isNaN(value)) {
      res[key] = value;
    }
  });

  return res;
}

export function setDataToUrl(data: DataType) {
  const urlParams = new URLSearchParams(window.location.search);
  const prevData = getDataFromUrl();
  const combinedData = { ...prevData, ...data };

  // Set values in order in case of initial set. That would also keep user order if he input it his way
  dataKeys.forEach((key) => {
    const value = combinedData[key as DataKeyType];

    if (typeof value === "number") {
      urlParams.set(key, String(value));
    }
  });
  console.log(urlParams);
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${urlParams}`
  );
}
