"use client"
import { API_URL } from "../app/constants";
import Link from "next/link";
import React, { useState, useEffect } from "react";

async function getProviders(id:string){
    const response = await fetch(`${API_URL}/${id}/providers`);
    if (!response.ok) {
        throw new Error(`HTTP 에러! status: ${response.status}`);
    }

    return response.json();
}

export default function MovieProviders({id}:{id:string}) {
    const [providers, setProviders] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        const fetchProviders = async () => {
            const result = await getProviders(id);
            setProviders(result);
            if (Object.keys(result).length > 0) {
                // setSelectedCountry(Object.keys(result)[0]);
                setSelectedCountry("");
            }
            setLoading(false);
        };
        fetchProviders();
    }, [id]);

    if (loading) return <div>로딩중...</div>;

    const countryCodes = Object.keys(providers);

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(e.target.value);
    };

    return (
        <div className="w-[80%] mx-auto items-center flex justify-center text-[#e5e7eb] text-center">
            <table className="border">
                <thead>
                    <tr className="border-b grid grid-cols-4">
                        <th className="p-2">
                            <span>CountryCode : </span>
                            <select onChange={handleCountryChange} value={selectedCountry} className="border border-[#b8b8b8] bg-black rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                <option value="" disabled>none</option>
                                {countryCodes.map((countryCode) => (
                                    <option key={countryCode} value={countryCode}>
                                        {countryCode}
                                    </option>
                                ))}
                            </select>
                        </th>
                        <th className="border-l flex justify-center items-center p-2">Flatrate</th>
                        <th className="border-l flex justify-center items-center p-2">Buy</th>
                        <th className="border-l flex justify-center items-center p-2">Rent</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="grid grid-cols-4">
                        <th scope="row" className="flex items-center justify-center p-2">
                            {providers[selectedCountry] && providers[selectedCountry].link ? (
                                <Link prefetch href={providers[selectedCountry].link} target={"_blank"}>
                                    <span>Providers (Click!)</span>
                                </Link>
                            ) : (
                                <span>Providers</span>
                            )}
                        </th>
                        <td className="border-l flex flex-wrap justify-center items-center">
                            {providers[selectedCountry]?.flatrate?.length > 0 ? (
                            providers[selectedCountry].flatrate.map((provider) => (
                                <div key={provider.provider_id} className="w-1/3 p-2">
                                    <img
                                    src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                                    alt={provider.provider_name}
                                    className="w-10 mx-auto"
                                    />
                                    <span>{provider.provider_name}</span>
                                </div>
                            ))) : (
                                <span>No Flatrate Providers</span>
                            )}
                        </td>
                        <td className="border-l flex flex-wrap justify-center items-center">
                            {providers[selectedCountry]?.buy?.length > 0 ? (
                                providers[selectedCountry].buy.map((provider) => (
                                    <div key={provider.provider_id} className="w-1/3 p-2">
                                        <img
                                        src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                                        alt={provider.provider_name}
                                        className="w-10 mx-auto"
                                        />
                                        <span>{provider.provider_name}</span>
                                    </div>
                                ))
                            ) : (
                                <span>No Buy Providers</span>
                            )}
                        </td>
                        <td className="border-l flex flex-wrap justify-center items-center">
                            {providers[selectedCountry]?.rent?.length > 0 ? (
                                providers[selectedCountry].rent.map((provider) => (
                                    <div key={provider.provider_id} className="w-1/3 p-2">
                                        <img
                                        src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                                        alt={provider.provider_name}
                                        className="w-10 mx-auto"
                                        />
                                        <span>{provider.provider_name}</span>
                                    </div>
                                ))
                            ) : (
                                <span>No Rent Providers</span>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}