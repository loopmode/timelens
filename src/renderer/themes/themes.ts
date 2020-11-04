import { getStatic } from '../utils/static';

export type ThemeConfig = {
  name: string;
  id: string;
  files?: {
    css?: string[];
    js?: string[];
  };
};
export const themes: {
  [name: string]: ThemeConfig;
} = {
  none: {
    name: 'None',
    id: 'none',
  },
  darkly: {
    name: 'Darkly',
    id: 'darkly',
    files: {
      css: [
        getStatic('themes/darkly/darkly.theme.css'),
        getStatic('themes/darkly/darkly.overrides.css'),
      ],
    },
  },
  flatly: {
    name: 'Flatly',
    id: 'flatly',
    files: {
      css: [getStatic('themes/flatly/flatly.theme.css')],
    },
  },
  materia: {
    name: 'Materia',
    id: 'materia',
    files: {
      css: [
        getStatic('themes/materia/materia.theme.css'),
        getStatic('themes/materia/materia.overrides.css'),
      ],
    },
  },
  minty: {
    name: 'Minty',
    id: 'minty',
    files: {
      css: [getStatic('themes/minty/minty.theme.css')],
    },
  },
  nuclear: {
    name: 'Nuclear',
    id: 'nuclear',
    files: {
      css: [getStatic('themes/nuclear/nuclear.theme.css')],
    },
  },
  pulse: {
    name: 'Pulse',
    id: 'pulse',
    files: {
      css: [
        getStatic('themes/pulse/pulse.theme.css'),
        getStatic('themes/pulse/pulse.overrides.css'),
      ],
    },
  },

  superhero: {
    name: 'Superhero',
    id: 'superhero',
    files: {
      css: [
        getStatic('themes/superhero/superhero.theme.css'),
        getStatic('themes/superhero/superhero.overrides.css'),
      ],
    },
  },
};
