---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/globals.stories.js` : null %>"
---
import { useEffect, useState } from '@storybook/preview-api';
import parse from 'style-to-object';
import * as colors from '../../color/colors.css?inline';

export default {
  title: 'globals/Variables',
};

export const colorsList = () => {
  return Object.keys(
    parse(colors.default.split(':root')[1].replace('{', '').replace('}', '')),
  )
    .map(
      (variable) =>
        `
        <div style="display: flex; align-items: center; padding-bottom: 20px;">
          <div style="background: var(${variable}); border: 3px solid black; width: 60px; height: 60px; border-radius: 50%; margin-right: 15px;"></div>
          <label class="a-text a-text--h4">${variable}</label>
        </div>
        `,
    )
    .join('');
};

const iconsArray = (icons) => {
  let iconString = '';
  if (window.drupalSettings.<%= h.changeCase.camelCase(name) %>SvgSprite) {
    iconString +=
      '<div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 16px;">';
    Array.prototype.forEach.call(icons, (icon) => {
      iconString += `
        <div style="font-size: 14px; width: 160px; border-radius: 6px; border: 1px solid rgba(0, 0, 0, 0.03); background-color: white; box-shadow: 0 4px 12px rgb(0 0 0 / 0.06); padding: 16px; text-align: center">
          <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; gap: 4px;">
            <div>
              <svg aria-hidden="true" style="width: 16px; height: 16px; vertical-align: top;">
                <use xlink:href="${
                  window.drupalSettings.<%= h.changeCase.camelCase(name) %>SvgSprite
                }#${icon.getAttribute('id')}"></use>
              </svg>
            </div>
            <div>
              ${icon.getAttribute('id')}
            </div>
          </div>
        </div>
      `;
    });
    iconString += '</div>';
  } else {
    iconString += 'No icons at this moment';
  }

  return iconString;
};

export const IconsList = {
  render: () => {
    const [icons, setIcons] = useState([]);
    useEffect(() => {
      fetch(window.drupalSettings.<%= h.changeCase.camelCase(name) %>SvgSprite)
        .then((response) => response.text())
        .then((text) => {
          const fakeIcon = document.createElement('div');
          fakeIcon.innerHTML = text;
          setIcons(fakeIcon.querySelectorAll('symbol'));
        });
    }, []);
    return iconsArray(icons);
  },
};

export const Breakpoints = {
  render: () => {
    let breakpoints = '';
    for (const [key, value] of Object.entries(
      window.drupalSettings.<%= h.changeCase.camelCase(name) %>Breakpoints,
    )) {
      breakpoints += `<tr><td style="padding: 5px 10px; background: #e6e6e6;"><strong>${key}</strong><td style="padding: 5px 10px; background: #f2f2f2;">${value}</td></td></tr>`;
    }
    return `
    <table style="font-size: 14px;">
      <thead>
        <tr>
          <th style="text-align: start; padding: 5px 10px; background: #fff4f4; font-weight: 400;">Breakpoint name</th>
          <th style="text-align: start; padding: 5px 10px; background: #fff4f4; font-weight: 400;">Value</th>
        </tr>
      </thead>
      <tbody>
        ${breakpoints}
      </tbody>
    </table>
  `;
  },
};
