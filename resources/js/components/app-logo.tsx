import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex items-center space-x-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
                <AppLogoIcon className="w-full h-full fill-current text-primary" />
            </div>
            <div className="text-left text-sm md:text-base">
                <span className="block font-semibold leading-tight truncate">
                    KFA x KDMP
                </span>
            </div>
        </div>
    );
}