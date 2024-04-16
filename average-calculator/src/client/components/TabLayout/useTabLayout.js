import { useState } from "react";

export function useTabLayout({ tabs }) {
  const [tabLayoutValue, setTabLayoutValue] = useState({
    index: 0,
    tabId: tabs[0].tabId,
  });

  const onIndexChange = (index) => {
    setTabLayoutValue({
      index,
      tabId: tabs[index].tabId,
    });
  };

  const tabLabels = tabs.map((tab) => tab.label);

  return {
    tabLayoutValue,
    onIndexChange,
    tabLabels,
  };
}
