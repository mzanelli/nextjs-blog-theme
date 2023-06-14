import { getGlobalData } from '../utils/global-data';

export default function Footer({ name }) {
  return (
    <footer style={{width:"100%"}} className="py-16 flex flex-col items-center">
      <div className="dark:text-white mt-8 mb-3 font-bold opacity-60">
        <div>@2023 Chronist.netlify.app</div>
        <div className="flex flex-col items-center">All Rights Reserver</div>
      </div>
    </footer>
  );
}
