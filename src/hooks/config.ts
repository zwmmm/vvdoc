import { default as _config } from "@config";
import { useEffect, useState } from "react";

export const useConfig = () => {
  const [config, setConfig] = useState(_config);
  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot!.accept('/@siteData', (m) => {
        setConfig(m.default)
      })
    }
  }, [])
  return config
}
