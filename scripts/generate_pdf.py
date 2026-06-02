import asyncio
import os
from playwright.async_api import async_playwright

# Arrel del projecte = carpeta pare d'aquest script (/scripts)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

async def generate_pdf():
    html_path = os.path.join(PROJECT_ROOT, "index.html")
    file_url = f"file:///{html_path.replace(os.sep, '/')}"
    output_pdf = os.path.join(PROJECT_ROOT, "baixter-vending-ca.pdf")

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=1,
        )
        page = await context.new_page()

        print(f"Obrint: {file_url}")
        await page.goto(file_url, wait_until="networkidle")

        # Assegurem idioma català
        await page.evaluate("applyTranslations('ca')")
        await page.wait_for_timeout(1500)

        # Amaguem el selector d'idioma per al PDF (opcional, queda més net)
        await page.add_style_tag(content="""
            /* Millores visuals per al PDF */
            .lang-switcher { display: none !important; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        """)

        await page.wait_for_timeout(500)

        await page.pdf(
            path=output_pdf,
            format="A4",
            landscape=False,
            print_background=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"},
            scale=0.72,
        )

        await browser.close()
        print(f"PDF generat correctament: {output_pdf}")

asyncio.run(generate_pdf())
