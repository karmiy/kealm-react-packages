import React from 'react';

export const createPageProvider = (PageName: string, PageComponent: React.ComponentType) =>
    [PageName, () => PageComponent] as const;
