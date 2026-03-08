export const AD_LINK = 'https://omg10.com/4/10693520';

const AD_LIMIT_KEY = 'tuvi_ad_last_shown';
const AD_LIMIT_HOURS = 24; // 24 tiếng giữa các lần hiện

interface AdShowResult {
  shown: boolean;
  reason?: string;
}

export const shouldShowAd = (pageKey: string): AdShowResult => {
  if (typeof window === 'undefined') return { shown: false, reason: 'server' };

  try {
    const storage = localStorage.getItem(AD_LIMIT_KEY);
    const now = Date.now();
    const data = storage ? JSON.parse(storage) : {};

    const pageData = data[pageKey] || {};

    // Chưa từng hiện hoặc đã quá 24 tiếng
    if (!pageData.lastShown || now - pageData.lastShown > AD_LIMIT_HOURS * 60 * 60 * 1000) {
      return { shown: true };
    }

    return { shown: false, reason: `recently_shown_${Math.round((now - pageData.lastShown) / (1000 * 60))}min_ago` };
  } catch {
    return { shown: false, reason: 'storage_error' };
  }
};

export const recordAdShown = (pageKey: string): void => {
  if (typeof window === 'undefined') return;

  try {
    const storage = localStorage.getItem(AD_LIMIT_KEY);
    const now = Date.now();
    const data = storage ? JSON.parse(storage) : {};

    data[pageKey] = {
      lastShown: now,
      count: (data[pageKey]?.count || 0) + 1,
    };

    localStorage.setItem(AD_LIMIT_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
};

export const openAdLink = (target?: string, pageKey?: string, _force?: boolean): boolean => {
  // Nếu không truyền pageKey thì luôn hiện (không limit)
  if (_force) {
    window.open(AD_LINK, target || '_blank', 'noopener,noreferrer');
    return true;
  }
  
  if (!pageKey) {
    window.open(AD_LINK, target || '_blank', 'noopener,noreferrer');
    return true;
  }

  const { shown } = shouldShowAd(pageKey);

  if (shown) {
    recordAdShown(pageKey);
    window.open(AD_LINK, target || '_blank', 'noopener,noreferrer');
    return true;
  }

  return false;
};
