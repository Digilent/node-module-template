import { <exportedModuleName> } from './dist/<moduleName>';
if (typeof window !== 'undefined') {
    window.<exportedModuleName> = <exportedModuleName>;
}
else {
    exports.<exportedModuleName> = <exportedModuleName>;
}